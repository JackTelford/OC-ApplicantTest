using OrchardCore.ContentManagement;

namespace CloudSolutions.Surveys.Core.Models;

public class ContentVersionPart : ContentPart
{
    public string ContentItemVersionId { get; set; }

    public string ContentItemId { get; set; }
}
