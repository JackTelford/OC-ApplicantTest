using System.Drawing;
using System.Globalization;
using CloudSolutions.Reporting.Core;
using CloudSolutions.Reporting.Core.Models;
using CloudSolutions.Reporting.Core.ViewModels;
using CloudSolutions.Surveys.Core;
using CloudSolutions.Surveys.Core.Models;
using CloudSolutions.Surveys.Core.Models.Reports;
using CloudSolutions.Surveys.Services;
using CloudSolutions.Surveys.ViewModels;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Http;
using Microsoft.Extensions.Localization;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using OfficeOpenXml;
using OrchardCore.Admin;
using OrchardCore.ContentManagement;
using OrchardCore.ContentManagement.Display;
using OrchardCore.DisplayManagement;
using OrchardCore.DisplayManagement.ModelBinding;
using OrchardCore.Mvc.Core.Utilities;
using YesSql;

namespace CloudSolutions.Surveys.Controllers;

[Admin]
public sealed class ReportsController : Controller, IUpdateModel
{
    public static readonly string Name = typeof(ReportsController).ControllerName();

    private readonly ISession _session;
    private readonly IDisplayManager<InterviewsDataViewModel> _displayManager;
    private readonly IUpdateModelAccessor _updateModelAccessor;
    private readonly InterviewsDataReportProvider _interviewsDataReportProvider;
    private readonly IContentItemDisplayManager _contentItemDisplayManager;
    private readonly ILogger _logger;
    private readonly IShapeFactory _shapeFactory;
    private readonly ReportingColorOptions _colorOptions;

    internal readonly IStringLocalizer S;

    public ReportsController(ISession session,
        IStringLocalizer<ReportsController> stringLocalizer,
        IDisplayManager<InterviewsDataViewModel> displayManager,
        IUpdateModelAccessor updateModelAccessor,
        InterviewsDataReportProvider interviewsDataReportProvider,
        IContentItemDisplayManager contentItemDisplayManager,
        ILogger<ReportsController> logger,
        IShapeFactory shapeFactory,
        IOptions<ReportingColorOptions> options
        )
    {
        _session = session;
        S = stringLocalizer;
        _displayManager = displayManager;
        _updateModelAccessor = updateModelAccessor;
        _interviewsDataReportProvider = interviewsDataReportProvider;
        _contentItemDisplayManager = contentItemDisplayManager;
        _logger = logger;
        _shapeFactory = shapeFactory;
        _colorOptions = options.Value;
    }

    public async Task<IActionResult> InterviewsData()
    {
        if (!await HttpContext.AuthorizeAsync(SurveyReportPermission.RunInterviewDataReport))
        {
            return Forbid();
        }

        var model = new InterviewsDataViewModel();

        var shape = new ExcelReportShapeViewModel
        {
            Filters = await _displayManager.UpdateEditorAsync(model, this, false, string.Empty, string.Empty)
        };

        // Since we call UpdateEditorAsync on a get request, only populate the report if everything passed validation.
        // Otherwise, clear the errors and render.
        if (ModelState.IsValid && model.IsValid())
        {
            await PopulateInterviewDataAsync(model, shape);
        }
        else
        {
            ModelState.Clear();
        }

        return View(shape);
    }

    [HttpPost, ActionName(nameof(InterviewsData))]
    public async Task<IActionResult> InterviewsDataPost()
    {
        if (!await HttpContext.AuthorizeAsync(SurveyReportPermission.RunInterviewDataReport))
        {
            return Forbid();
        }

        var model = new InterviewsDataViewModel();
        var shape = new ExcelReportShapeViewModel
        {
            Filters = await _displayManager.UpdateEditorAsync(model, this, false, string.Empty, string.Empty)
        };

        if (ModelState.IsValid && model.IsValid())
        {
            await PopulateInterviewDataAsync(model, shape);
        }

        return View(shape);
    }

    private async Task PopulateInterviewDataAsync(InterviewsDataViewModel model, ExcelReportShapeViewModel shape)
    {
        await _interviewsDataReportProvider.PopulateAsync(model, true);

        if (model.Interviews?.Count > 0)
        {
            // generate the excel file
            var excel = new ExcelPackage();
            var workSheet = excel.AddSheet(S["Interview Data"]);

            var rowIndex = 1;

            // add columns to the report
            var columnIndex = 0;
            workSheet.Cells[rowIndex, ++columnIndex].Value = S["Completed By"].Value;
            workSheet.Cells[rowIndex, ++columnIndex].Value = S["Completed At"].Value;

            foreach (var column in model.Columns)
            {
                workSheet.Cells[rowIndex, ++columnIndex].Value = column.Title;
            }

            var records = model.Interviews.OrderBy(x => x.FullName)
                .ThenBy(x => x.InterviewedAtLocal);

            var colors = new Dictionary<string, Color>();

            foreach (var record in records)
            {
                rowIndex++;
                columnIndex = 0;
                workSheet.Cells[rowIndex, ++columnIndex].Value = record.FullName;
                workSheet.Cells[rowIndex, ++columnIndex].Value = record.InterviewedAtLocal?.ToString("g", CultureInfo.InvariantCulture);

                var stepPart = record.ContentItem.As<InterviewStepPart>();

                if (stepPart == null)
                {
                    continue;
                }

                foreach (var visitedPage in stepPart.VisitedPages)
                {
                    foreach (var visitedQuestion in visitedPage.Questions())
                    {
                        var inputs = visitedQuestion.Inputs().ToDictionary(x => x.ContentItemId);

                        foreach (var reportColumn in model.Columns)
                        {
                            if (!inputs.TryGetValue(reportColumn.InputId, out var input))
                            {
                                continue;
                            }

                            // lets attach the ReportColumn to the control to the driver can look at the current style of the survey
                            // reportColumn has the current shape of the survey
                            input.Weld(reportColumn);

                            // TODO, find another way than using shapes here! It's currently used for things like cell coloring on the UI.
                            var cellShape = await _contentItemDisplayManager.BuildDisplayAsync(input, this, string.Empty, SurveyConstants.Report);

                            var cell = new ReportCell(input)
                            {
                                Average = cellShape.ReportAverage(),
                                Sum = cellShape.ReportSum(),
                                Value = cellShape.ReportText(),
                            };

                            var cellViewModel = GetTableCellInfo(cellShape);

                            var numericValue = cell.Average ?? cell.Sum;

                            // populate the cell.
                            workSheet.Cells[rowIndex, ++columnIndex].Value = numericValue.HasValue ? numericValue : cell.Value;

                            if (cellViewModel == null)
                            {
                                continue;
                            }

                            if (cellViewModel.BackgroundColor != null)
                            {
                                if (!colors.TryGetValue(cellViewModel.BackgroundColor, out var color))
                                {
                                    color = ColorTranslator.FromHtml(cellViewModel.BackgroundColor);
                                    colors.Add(cellViewModel.BackgroundColor, color);
                                }

                                workSheet.Cells[rowIndex, columnIndex].Style.Fill.PatternType = OfficeOpenXml.Style.ExcelFillStyle.Solid;
                                workSheet.Cells[rowIndex, columnIndex].Style.Fill.BackgroundColor.SetColor(color);
                            }

                            if (cellViewModel.FontColor != null)
                            {
                                if (!colors.TryGetValue(cellViewModel.FontColor, out var color))
                                {
                                    color = ColorTranslator.FromHtml(cellViewModel.FontColor);
                                    colors.Add(cellViewModel.FontColor, color);
                                }

                                workSheet.Cells[rowIndex, columnIndex].Style.Font.Color.SetColor(color);
                            }
                        }
                    }
                }
            }

            workSheet.ApplyDefaults(_colorOptions);

            shape.Excel = excel;
        }
    }

    public async Task<IActionResult> InterviewsData1()
    {
        if (!await HttpContext.AuthorizeAsync(SurveyReportPermission.RunInterviewDataReport))
        {
            return Forbid();
        }

        var shape = new ExcelReportShapeViewModel
        {
            Filters = await _displayManager.BuildEditorAsync<InterviewsDataViewModel>(this, false)
        };

        return View(shape);
    }

    [HttpPost, ActionName(nameof(InterviewsData1))]
    public async Task<IActionResult> InterviewsDataPost1()
    {
        if (!await HttpContext.AuthorizeAsync(SurveyReportPermission.RunInterviewDataReport))
        {
            return Forbid();
        }

        var model = new InterviewsDataViewModel();
        var shape = new ExcelReportShapeViewModel
        {
            Filters = await _displayManager.UpdateEditorAsync(model, this, false, string.Empty, string.Empty)
        };

        if (ModelState.IsValid && model.IsValid())
        {
            await _interviewsDataReportProvider.PopulateAsync(model, true);

            if (model.Interviews?.Count > 0)
            {
                return Content("Done");
            }
        }

        return View(shape);
    }

    private static TableCellViewModel GetTableCellInfo(dynamic obj)
    {
        if (obj != null && obj.Content != null && obj.Content.Items != null)
        {
            foreach (var item in obj.Content.Items)
            {
                var b = item as TableCellViewModel;

                if (b != null)
                {
                    return b;
                }
            }
        }

        return null;
    }
}
