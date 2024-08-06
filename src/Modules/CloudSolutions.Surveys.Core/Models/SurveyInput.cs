using OrchardCore.ContentManagement;
using OrchardCore.DisplayManagement.Handlers;

namespace CloudSolutions.Surveys.Core.Models;

public sealed class SurveyInput : ContentElement
{
    public SurveyQuestion Question { get; private set; }

    public BuildShapeContext BuildContext { get; set; }

    public bool IsNew { get; set; }

    public SurveyInput(ContentItem inputContentItem, SurveyQuestion question, BuildShapeContext context, bool isNew)
    {
        ContentItem = inputContentItem ?? throw new ArgumentNullException(nameof(inputContentItem));
        Question = question ?? throw new ArgumentNullException(nameof(question));
        BuildContext = context ?? throw new ArgumentNullException(nameof(context));
        IsNew = isNew;
    }
}
