using OrchardCore.ContentManagement;

namespace CloudSolutions.Surveys.Services;

public sealed class PageNavigation
{
    public bool HasPreviousPage { get; set; }
    public bool HasNextPage { get; set; }
    public bool CanGoBack { get; set; }


    public static PageNavigation Make(LinkedListNode<ContentItem> pages)
    {
        ArgumentNullException.ThrowIfNull(pages);

        var navigation = new PageNavigation()
        {
            HasPreviousPage = pages.Previous != null,
            HasNextPage = pages.Next != null,
            CanGoBack = pages.Previous != null,
        };

        return navigation;
    }
}
