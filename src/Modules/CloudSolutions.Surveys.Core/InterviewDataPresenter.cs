using CloudSolutions.Surveys.Core.Models;
using CloudSolutions.Surveys.Core.Models.Reports;
using OrchardCore.ContentManagement;
using OrchardCore.ContentManagement.Display;
using OrchardCore.DisplayManagement.ModelBinding;
using OrchardCore.Flows.Models;
using OrchardCore.Modules;

namespace CloudSolutions.Surveys.Core;

public sealed class InterviewDataPresenter : IInterviewDataPresenter
{
    private readonly IContentItemDisplayManager _displayManager;
    private readonly IUpdateModelAccessor _updateModelAccessor;
    private readonly ILocalClock _clock;

    public InterviewDataPresenter(
        ILocalClock clock,
        IContentItemDisplayManager displayManager,
        IUpdateModelAccessor updateModelAccessor)
    {
        _clock = clock;
        _displayManager = displayManager;
        _updateModelAccessor = updateModelAccessor;
    }


    public async Task<ReportTable> GetTableAsync(ContentItem survey, IEnumerable<ContentItem> interviews)
    {
        var table = new ReportTable(await GetReportColumnsAsync(survey));

        foreach (var interview in interviews)
        {
            var stepPart = interview.As<InterviewStepPart>();

            if (stepPart == null)
            {
                continue;
            }

            var row = new ReportRow
            {
                InterviewAtLocal = await _clock.ConvertToLocalAsync(stepPart.InterviewedAtUtc),
                InterviewedAtUtc = stepPart.InterviewedAtUtc,
                InterviewedBy = stepPart.IntervieweeId ?? interview.Owner,
                InterviewId = interview.ContentItemId
            };

            foreach (var visitedPage in stepPart.VisitedPages)
            {
                var questionItems = visitedPage.Get<BagPart>(SurveyConstants.Questions);

                if (questionItems == null || questionItems.ContentItems.Count == 0)
                {
                    continue;
                }

                foreach (var questionItem in questionItems.ContentItems)
                {
                    var inputItems = questionItem.Get<BagPart>(SurveyConstants.Inputs);

                    if (inputItems == null || inputItems.ContentItems.Count == 0)
                    {
                        continue;
                    }

                    foreach (var input in inputItems.ContentItems)
                    {
                        var shape = await _displayManager.BuildDisplayAsync(input, _updateModelAccessor.ModelUpdater, string.Empty, SurveyConstants.Report);

                        var cell = new ReportCell
                        {
                            Input = input,
                            // need to get the raw value somehow.
                            // Value = shape.Content?.Items?.
                            InputId = input.ContentItemId,
                            Average = shape.ReportAverage(),
                            Sum = shape.ReportSum(),
                        };

                        row.Cells.Add(cell);
                    }
                }
            }

            table.Rows.Add(row);
        }

        return table;
    }


    public Task<IList<ReportColumn>> GetReportColumnsAsync(ContentItem survey)
    {
        var reportColumns = new List<ReportColumn>();

        foreach (var pageItem in survey.Pages())
        {
            foreach (var questionItem in pageItem.Questions())
            {
                foreach (var input in questionItem.Inputs())
                {
                    var metadata = input.As<SurveyControlPartMetadata>() ?? new SurveyControlPartMetadata();

                    reportColumns.Add(new ReportColumn(input, questionItem, pageItem, metadata.Aggregable));
                }
            }
        }

        return Task.FromResult<IList<ReportColumn>>(reportColumns);
    }
}
