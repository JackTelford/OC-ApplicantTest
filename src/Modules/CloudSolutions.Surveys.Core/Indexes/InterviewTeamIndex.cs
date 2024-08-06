using CloudSolutions.Teams.Models;
using OrchardCore.ContentManagement;
using YesSql.Indexes;

namespace CloudSolutions.Surveys.Core.Indexes;

public sealed class InterviewTeamIndex : MapIndex
{
    public string InterviewId { get; set; }

    public string TeamId { get; set; }
}

public sealed class InterviewTeamIndexProvider : IndexProvider<ContentItem>
{
    public override void Describe(DescribeContext<ContentItem> context)
    {
        context.For<InterviewTeamIndex>()
            .Map(contentItem =>
            {
                if (contentItem?.ContentType != SurveyConstants.InterviewContentType || !contentItem.Published || !contentItem.Latest)
                {
                    return null;
                }

                var indexes = new List<InterviewTeamIndex>();
                var teamPart = contentItem.As<TeamPart>();

                if (teamPart != null && teamPart.Team != null)
                {
                    foreach (var teamId in teamPart.Team.ContentItemIds)
                    {
                        indexes.Add(new InterviewTeamIndex()
                        {
                            InterviewId = contentItem.ContentItemId,
                            TeamId = teamId,
                        });
                    }
                }

                return indexes;
            });


    }
}
