using OrchardCore.ContentManagement;

namespace CloudSolutions.Surveys.Core.Models;

public sealed class InterviewStepPart : ContentPart
{
    // current page id
    public string PageContentId { get; set; }

    public string Status { get; set; }

    public List<ContentItem> VisitedPages { get; set; }

    public string IntervieweeId { get; set; }

    public DateTime InterviewedAtUtc { get; set; }
}
