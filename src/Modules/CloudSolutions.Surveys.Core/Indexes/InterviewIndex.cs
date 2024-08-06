using CloudSolutions.Surveys.Core.Models;
using CloudSolutions.Teams.Models;
using OrchardCore.ContentManagement;
using YesSql.Indexes;

namespace CloudSolutions.Surveys.Core.Indexes;

public sealed class InterviewIndex : MapIndex
{
    public string InterviewId { get; set; }

    public string SurveyContentItemId { get; set; }

    public string SurveyVersionId { get; set; }

    public string PageId { get; set; }

    public string Status { get; set; }

    public string IntervieweeId { get; set; }

    public DateTime? InterviewedAt { get; set; }
}

public sealed class InterviewIndexProvider : IndexProvider<ContentItem>
{
    public override void Describe(DescribeContext<ContentItem> context)
    {
        context.For<InterviewIndex>()
            .Map(contentItem =>
            {
                if (contentItem == null || contentItem.ContentType != SurveyConstants.InterviewContentType || !contentItem.Published || !contentItem.Latest)
                {
                    return null;
                }

                var surveyPart = contentItem.As<SurveyIdentiferPart>();
                var stepPart = contentItem.As<InterviewStepPart>();

                if (surveyPart == null
                    || stepPart == null
                    || surveyPart.ContentItemVersionId == null
                    || surveyPart.ContentItemId == null
                    || string.IsNullOrEmpty(stepPart?.PageContentId)
                    || string.IsNullOrEmpty(stepPart?.Status))
                {
                    return null;
                }

                var teamPart = contentItem.As<TeamPart>();

                return new InterviewIndex()
                {
                    InterviewId = contentItem.ContentItemId,
                    SurveyVersionId = surveyPart.ContentItemVersionId,
                    SurveyContentItemId = surveyPart.ContentItemId,
                    PageId = stepPart.PageContentId,
                    Status = stepPart.Status,
                    InterviewedAt = stepPart.InterviewedAtUtc,
                    IntervieweeId = stepPart.IntervieweeId ?? contentItem.Owner,
                };
            });


    }
}
