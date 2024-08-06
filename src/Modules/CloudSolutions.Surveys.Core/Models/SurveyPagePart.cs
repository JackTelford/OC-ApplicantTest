using OrchardCore.ContentFields.Fields;
using OrchardCore.ContentManagement;

namespace CloudSolutions.Surveys.Core.Models;

public sealed class SurveyPagePart : ContentPart
{
    public HtmlField Description { get; set; }
}
