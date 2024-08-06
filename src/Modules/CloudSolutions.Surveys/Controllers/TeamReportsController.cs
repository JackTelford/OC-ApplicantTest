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
using CloudSolutions.Teams;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Http;
using Microsoft.Extensions.Localization;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using OfficeOpenXml;
using OfficeOpenXml.Style;
using OrchardCore.Admin;
using OrchardCore.ContentManagement;
using OrchardCore.ContentManagement.Display;
using OrchardCore.DisplayManagement;
using OrchardCore.DisplayManagement.ModelBinding;
using OrchardCore.Flows.Models;
using OrchardCore.Modules;
using YesSql;

namespace CloudSolutions.Surveys.Controllers;

[Admin]
[Feature("CloudSolutions.Surveys.Teams")]
public sealed class TeamReportsController : Controller, IUpdateModel
{
    private readonly ISession _session;
    private readonly ILocalClock _localClock;
    private readonly ITeamStore _teamStore;
    private readonly IDisplayManager<InterviewsDataViewModel> _displayManager;
    private readonly IUpdateModelAccessor _updateModelAccessor;
    private readonly InterviewsDataReportProvider _interviewsDataReportProvider;
    private readonly IContentItemDisplayManager _contentItemDisplayManager;
    private readonly ILogger _logger;
    private readonly IShapeFactory _shapeFactory;
    private readonly ReportingColorOptions _colorOptions;

    internal readonly IStringLocalizer S;

    public TeamReportsController(ISession session,
        ILocalClock localClock,
        ITeamStore teamStore,
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
        _localClock = localClock;
        _teamStore = teamStore;
        S = stringLocalizer;
        _displayManager = displayManager;
        _updateModelAccessor = updateModelAccessor;
        _interviewsDataReportProvider = interviewsDataReportProvider;
        _contentItemDisplayManager = contentItemDisplayManager;
        _logger = logger;
        _shapeFactory = shapeFactory;
        _colorOptions = options.Value;
    }

    public async Task<IActionResult> InterviewsDataByTeam()
    {
        if (!await HttpContext.AuthorizeAsync(SurveyReportPermission.RunInterviewDataReportByTeam))
        {
            return Forbid();
        }
        var model = new InterviewsDataByTeamViewModel();
        var viewModel = new ExcelReportShapeViewModel
        {
            Filters = await _displayManager.UpdateEditorAsync(model, this, false, string.Empty, string.Empty)
        };

        // Since we call UpdateEditorAsync on a get request, only populate the report if everything passed validation.
        // Otherwise, clear the errors and render.
        if (ModelState.IsValid && model.IsValid())
        {
            await PopulateInterviewDataAsync(model, viewModel);
        }
        else
        {
            ModelState.Clear();
        }

        return View(viewModel);
    }

    [HttpPost, ActionName(nameof(InterviewsDataByTeam))]
    public async Task<IActionResult> InterviewsDataByTeamPost()
    {
        if (!await HttpContext.AuthorizeAsync(SurveyReportPermission.RunInterviewDataReportByTeam))
        {
            return Forbid();
        }
        var model = new InterviewsDataByTeamViewModel();
        var viewModel = new ExcelReportShapeViewModel
        {
            Filters = await _displayManager.UpdateEditorAsync(model as InterviewsDataViewModel, _updateModelAccessor.ModelUpdater, false, string.Empty, string.Empty),
        };

        if (ModelState.IsValid && model.IsValid())
        {
            await PopulateInterviewDataAsync(model, viewModel);
        }

        return View(viewModel);
    }

    private async Task PopulateInterviewDataAsync(InterviewsDataByTeamViewModel model, ExcelReportShapeViewModel viewModel)
    {
        await _interviewsDataReportProvider.PopulateAsync(model, true, true);
        var grandTotals = new Dictionary<string, List<ReportCell>>();

        // Group interviews by team
        foreach (var record in model.Interviews)
        {
            foreach (var teamId in record.TeamIds)
            {
                if (!model.Rows.TryGetValue(teamId, out var value))
                {
                    value = [];
                    model.Rows.Add(teamId, value);
                }

                value.Add(record);
            }
        }

        // generate the excel file
        var excel = new ExcelPackage();
        var workSheet = excel.AddSheet(S["Interview Data By Team"]);

        var rowIndex = 1;

        // add columns to the report
        var columnIndex = 0;
        workSheet.Cells[rowIndex, ++columnIndex].Value = S["Team Name"].Value;
        workSheet.Cells[rowIndex, ++columnIndex].Value = S["Completed By"].Value;
        workSheet.Cells[rowIndex, ++columnIndex].Value = S["Completed At"].Value;

        foreach (var column in model.Columns)
        {
            workSheet.Cells[rowIndex, ++columnIndex].Value = column.Title;
        }


        var totalCellToMerge = 2;
        var rows = model.Rows.OrderBy(x => x.Key).ToList();
        var colors = new Dictionary<string, Color>();

        foreach (var row in rows)
        {
            if (!model.Teams.TryGetValue(row.Key, out var team))
            {
                continue;
            }

            var totals = new Dictionary<string, List<ReportCell>>();
            var records = row.Value.OrderBy(x => x.FullName).ThenBy(x => x.InterviewedAtLocal).ToList();
            for (var i = 0; i < records.Count; i++)
            {
                rowIndex++;

                // we always start at 1 since we may skip the team title 
                columnIndex = 1;
                var record = records[i];
                var stepPart = record.ContentItem.As<InterviewStepPart>();

                if (i == 0)
                {
                    // here we display the team id without incrementing the index since we sometimes may want to skip it
                    workSheet.Cells[rowIndex, columnIndex].Value = team.DisplayText;
                }

                workSheet.Cells[rowIndex, ++columnIndex].Value = record.FullName;
                workSheet.Cells[rowIndex, ++columnIndex].Value = record.InterviewedAtLocal?.ToString("g", CultureInfo.InvariantCulture);

                foreach (var visitedPage in stepPart.VisitedPages)
                {
                    var visitedQuestionsPart = visitedPage.Get<BagPart>(SurveyConstants.Questions);

                    if (visitedQuestionsPart == null || visitedQuestionsPart.ContentItems == null || visitedQuestionsPart.ContentItems.Count == 0)
                    {
                        continue;
                    }

                    foreach (var visitedQuestion in visitedQuestionsPart.ContentItems)
                    {
                        var visitedControl = visitedQuestion.Get<BagPart>(SurveyConstants.Inputs);

                        if (visitedControl?.ContentItems?.Count == 0)
                        {
                            continue;
                        }

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
                            var shape = await _contentItemDisplayManager.BuildDisplayAsync(input, this, string.Empty, SurveyConstants.Report);
                            var cellCalculations = new ReportCell(input)
                            {
                                Average = shape.ReportAverage(),
                                Sum = shape.ReportSum(),
                            };

                            if (!totals.TryGetValue(reportColumn.Id, out var value))
                            {
                                value = [];
                                totals.Add(reportColumn.Id, value);
                            }

                            value.Add(cellCalculations);

                            var cellViewModel = GetTableCellInfo(shape);

                            // populate the cell.
                            var cell = workSheet.Cells[rowIndex, ++columnIndex];
                            cell.Value = cellCalculations.Average; // here we display the value...
                            cell.Style.HorizontalAlignment = ExcelHorizontalAlignment.Center;

                            if (cellViewModel != null)
                            {
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
            }

            foreach (var total in totals)
            {
                if (!grandTotals.TryGetValue(total.Key, out var value))
                {
                    value = [];
                    grandTotals[total.Key] = value;
                }

                value.AddRange(total.Value);
            }

            // add team subtotal
            rowIndex++;
            columnIndex = 1;
            workSheet.Cells[rowIndex, columnIndex].Value = team.DisplayText + " " + S["Subtotal"].Value;
            workSheet.Cells[rowIndex, columnIndex, rowIndex, columnIndex + totalCellToMerge].Merge = true;


            var subTotalRow = workSheet.Cells[rowIndex, 1, rowIndex, model.Columns.Count + columnIndex + totalCellToMerge];
            subTotalRow.Style.SetSubline1(_colorOptions);

            // increment the column after finishing adjusting to it
            columnIndex += totalCellToMerge;
            foreach (var reportColumn in model.Columns)
            {
                double? avg = null;

                if (totals.TryGetValue(reportColumn.Id, out var value))
                {
                    avg = value.Average(x => x.Average);
                }

                var cell = workSheet.Cells[rowIndex, ++columnIndex];
                cell.Value = avg?.ToString("0.##", CultureInfo.InvariantCulture);
                cell.Style.HorizontalAlignment = ExcelHorizontalAlignment.Center;
            }

        }

        if (rows.Count > 0)
        {
            // we add totals only if there are rows.
            // Add grand total
            rowIndex++;
            columnIndex = 1;
            workSheet.Cells[rowIndex, columnIndex].Value = S["Total"].Value;
            workSheet.Cells[rowIndex, columnIndex, rowIndex, columnIndex + totalCellToMerge].Merge = true;

            var totalRow = workSheet.Cells[rowIndex, columnIndex, rowIndex, model.Columns.Count + columnIndex + totalCellToMerge];
            totalRow.Style.SetTotal1(_colorOptions);
            // increment the column after finishing adjusting it
            columnIndex += totalCellToMerge;
            foreach (var reportColumn in model.Columns)
            {
                double? avg = null;

                if (grandTotals.TryGetValue(reportColumn.Id, out var value))
                {
                    avg = value.Average(x => x.Average);
                }
                var cell = workSheet.Cells[rowIndex, ++columnIndex];
                cell.Value = avg?.ToString("0.##", CultureInfo.InvariantCulture);
                cell.Style.HorizontalAlignment = ExcelHorizontalAlignment.Center;
            }
        }

        workSheet.ApplyDefaults(_colorOptions);
        viewModel.Excel = excel;
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
