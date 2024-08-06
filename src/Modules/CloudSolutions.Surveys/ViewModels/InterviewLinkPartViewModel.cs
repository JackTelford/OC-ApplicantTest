using Microsoft.AspNetCore.Mvc.ModelBinding;
using OrchardCore.ContentManagement;

namespace CloudSolutions.Surveys.ViewModels;

public class InterviewLinkPartViewModel
{
    public string Link { get; set; }

    [BindNever]
    public ContentItem ContentItem { get; set; }
}
