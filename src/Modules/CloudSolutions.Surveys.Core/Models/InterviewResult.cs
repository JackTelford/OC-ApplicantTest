using OrchardCore.ContentManagement;

namespace CloudSolutions.Surveys.Services;

public sealed class InterviewResult
{
    public ContentItem Interview { get; set; }

    public bool IsComplete { get; set; }

    public ContentItem Page { get; set; }

    public PageNavigation Navigation { get; set; }
    public ContentItem Survey { get; set; }
}
