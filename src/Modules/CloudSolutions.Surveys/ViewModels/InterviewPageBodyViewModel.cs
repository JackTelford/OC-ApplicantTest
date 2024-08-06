using Microsoft.AspNetCore.Mvc.ModelBinding;
using OrchardCore.ContentManagement;
using OrchardCore.DisplayManagement.Handlers;

namespace CloudSolutions.Surveys.ViewModels;

public class InterviewPageBodyViewModel
{

    [BindNever]
    public List<ContentItem> Questions { get; set; }

    [BindNever]
    public BuildEditorContext BuildContext { get; set; }
}
