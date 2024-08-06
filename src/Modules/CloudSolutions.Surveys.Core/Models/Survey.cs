using OrchardCore.ContentManagement;

namespace CloudSolutions.Surveys.Core.Models;

public sealed class Survey : ContentElement
{
    public ContentItem Interview { get; set; }

    public Survey()
    {
    }

    public Survey(ContentItem contentItem)
    {
        ContentItem = contentItem;
    }
}
