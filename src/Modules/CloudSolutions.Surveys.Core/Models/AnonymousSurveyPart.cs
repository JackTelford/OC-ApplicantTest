using OrchardCore.ContentManagement;

namespace CloudSolutions.Surveys.Core.Models;

public class AnonymousSurveyPart : ContentPart
{
    public bool AllowAnonymous { get; set; }
}
