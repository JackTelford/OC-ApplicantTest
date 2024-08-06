using CloudSolutions.Surveys.Core.Models;
using CloudSolutions.Surveys.Core.Models.Reports;
using CloudSolutions.Surveys.Services;
using OrchardCore.ContentManagement;
using OrchardCore.Flows.Models;

namespace CloudSolutions.Surveys.Core;

public static class ContentItemExtensions
{
    public static List<ContentItem> Pages(this ContentItem survey)
    {
        if (survey.ContentType != SurveyConstants.SurveyContentType)
        {
            throw new ArgumentOutOfRangeException($"Pages are only available on a '{SurveyConstants.SurveyContentType}' content type. You're trying to access the pages on a '{survey.ContentType}' content type.");
        }

        var pagesPart = survey.Get<BagPart>(SurveyConstants.Pages);

        return pagesPart?.ContentItems ?? [];
    }

    public static List<ContentItem> Questions(this ContentItem page)
    {
        if (page.ContentType != SurveyConstants.SurveyPageContentType)
        {
            throw new ArgumentOutOfRangeException($"Questions are only available on a '{SurveyConstants.SurveyPageContentType}' content type. You're trying to access the questions on a '{page.ContentType}' content type.");
        }

        var questionPart = page.Get<BagPart>(SurveyConstants.Questions);

        return questionPart?.ContentItems ?? [];
    }

    public static List<ContentItem> Inputs(this ContentItem question)
    {
        if (question.ContentType != SurveyConstants.SurveyQuestionContentType)
        {
            throw new ArgumentOutOfRangeException($"Inputs are only available on a '{SurveyConstants.SurveyQuestionContentType}' content type. You're trying to access the inputs on a '{question.ContentType}' content type.");
        }

        var questionPart = question.Get<BagPart>(SurveyConstants.Inputs);

        return questionPart?.ContentItems ?? [];
    }

    public static IEnumerable<ThresholdSummary> ThresholdSummaries(this ContentItem interview)
    {
        if (interview.ContentType != SurveyConstants.InterviewContentType)
        {
            throw new ArgumentOutOfRangeException($"ThresholdSummaries are only available on a '{SurveyConstants.InterviewContentType}' content type. You're trying to access the inputs on a '{interview.ContentType}' content type.");
        }

        var thresholdSummaries = new List<ThresholdSummary>();

        if (!interview.TryGet<InterviewStepPart>(out var stepPart) ||
            string.IsNullOrEmpty(stepPart.IntervieweeId))
        {
            return thresholdSummaries;
        }

        foreach (var page in stepPart.VisitedPages)
        {
            foreach (var question in page.Questions())
            {
                foreach (var input in question.Inputs())
                {
                    if (!input.TryGet<PredefinedListSurveyControlPart>(out var predefinedPart))
                    {
                        continue;
                    }

                    if (!input.ContentItem.TryGet<PredefinedListSurveyControlPartMetadata>(out var metadataPart) ||
                        !metadataPart.Threshold.HasValue)
                    {
                        continue;
                    }

                    // get the select values that are in the metadata options!
                    var selectedOptions = metadataPart.Options.Where(option => predefinedPart.Values != null && predefinedPart.Values.Contains(option.Value));

                    var criticalAnswer = selectedOptions.Where(option => option.Weight.HasValue && option.Weight.Value < metadataPart.Threshold.Value);

                    if (criticalAnswer.Any())
                    {
                        var metadata = input.As<SurveyControlPartMetadata>() ?? new SurveyControlPartMetadata();

                        // a respond below the threshold, notify users
                        var column = new ReportColumn(input, question, page, metadata.Aggregable);

                        thresholdSummaries.Add(new ThresholdSummary()
                        {
                            Title = column.Title,
                            Respond = criticalAnswer.Min(x => x.Weight.Value),
                            Threshold = metadataPart.Threshold.Value,
                        });
                    }
                }
            }
        }

        return thresholdSummaries;
    }
}
