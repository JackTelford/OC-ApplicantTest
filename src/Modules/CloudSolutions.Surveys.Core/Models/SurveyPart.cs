using OrchardCore.ContentFields.Fields;
using OrchardCore.ContentManagement;

namespace CloudSolutions.Surveys.Core.Models;

public sealed class SurveyPart : ContentPart
{
    public HtmlField Description { get; set; }

    public TextField CompletedMessage { get; set; }
}
