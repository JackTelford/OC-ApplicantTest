using OrchardCore.ContentManagement;
using OrchardCore.ContentManagement.Records;
using YesSql;

namespace CloudSolutions.Surveys.Core;

public static class SessionExtensions
{
    public static async Task<ContentItem> SurveyByVersionAsync(this ISession session, string surveyVersionId)
    {
        return await session.Query<ContentItem, ContentItemIndex>(x => x.ContentItemVersionId == surveyVersionId && x.ContentType == SurveyConstants.SurveyContentType).FirstOrDefaultAsync();
    }
}
