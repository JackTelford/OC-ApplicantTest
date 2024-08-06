using OrchardCore.ContentFields.Fields;
using OrchardCore.ContentManagement;

namespace CloudSolutions.Surveys.Core.Models;

public sealed class SurveyQuestionPart : ContentPart
{
    public HtmlField Description { get; set; }
}
