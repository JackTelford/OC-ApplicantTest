using OrchardCore.ContentManagement;

namespace CloudSolutions.Surveys.Core;

public interface IInterviewHandler
{
    Task CompletingAsync(ContentItem interview);

    Task CompletedAsync(ContentItem interview);
}
