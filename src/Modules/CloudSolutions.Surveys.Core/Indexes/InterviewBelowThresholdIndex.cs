using CloudSolutions.Surveys.Core;
using CloudSolutions.Surveys.Core.Models;
using CrestApps.Support;
using OrchardCore.ContentManagement;
using YesSql.Indexes;

namespace CloudSolutions.Surveys.Indexes;

public sealed class InterviewBelowThresholdIndex : MapIndex
{
    public string SurveyContentItemId { get; set; }

    public string InterviewId { get; set; }

    public DateTime? InterviewedAt { get; set; }

    public string UserId { get; set; }

    public double? Threshold { get; set; }

    public double? Response { get; set; }

    public string SurveyVersionId { get; set; }

    public string Title { get; set; }
}

public sealed class InterviewBelowThresholdIndexProvider : IndexProvider<ContentItem>
{
    public override void Describe(DescribeContext<ContentItem> context)
    {
        context.For<InterviewBelowThresholdIndex>()
            .When(x => x.ContentType == SurveyConstants.InterviewContentType && x.Published)
            .Map(contentItem =>
            {
                if (!contentItem.TryGet<InterviewStepPart>(out var stepPart) ||
                !string.Equals(stepPart.Status, SurveyConstants.Completed, StringComparison.Ordinal))
                {
                    return null;
                }

                if (!contentItem.TryGet<SurveyIdentiferPart>(out var interviewIdentifierPart))
                {
                    return null;
                }

                var thresholdSummaries = contentItem.ThresholdSummaries();

                return thresholdSummaries.Select(summary => new InterviewBelowThresholdIndex()
                {
                    SurveyVersionId = interviewIdentifierPart.ContentItemVersionId,
                    SurveyContentItemId = interviewIdentifierPart.ContentItemId,
                    InterviewId = stepPart.IntervieweeId,
                    InterviewedAt = stepPart.InterviewedAtUtc,
                    UserId = contentItem.Owner,
                    Threshold = summary.Threshold,
                    Response = summary.Respond,
                    Title = Str.Truncate(summary.Title, 500),
                });
            });
    }
}
