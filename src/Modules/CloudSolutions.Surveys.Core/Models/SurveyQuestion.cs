using OrchardCore.ContentManagement;
using OrchardCore.DisplayManagement.Handlers;

namespace CloudSolutions.Surveys.Core.Models;

public sealed class SurveyQuestion : ContentElement
{
    public ContentItem InterviewContentItem { get; set; }

    public ContentItem PageContentItem { get; set; }

    public BuildShapeContext BuildContext { get; set; }

    public bool IsNew { get; set; }

    public SurveyQuestion()
    {
    }

    public SurveyQuestion(ContentItem questionContentItem, BuildShapeContext context, bool isNew)
    {
        ContentItem = questionContentItem;
        BuildContext = context;
        IsNew = isNew;
    }
}
