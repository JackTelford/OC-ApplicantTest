using Microsoft.AspNetCore.Mvc.ModelBinding;
using OrchardCore.ContentManagement;
using OrchardCore.DisplayManagement.Handlers;

namespace CloudSolutions.Surveys.ViewModels;

public class InterviewQuestionViewModel
{
    [BindNever]
    public string QuestionId { get; set; }

    [BindNever]
    public string Title { get; set; }

    [BindNever]
    public string Description { get; set; }

    [BindNever]
    public List<ContentItem> Controls { get; set; }
    public BuildEditorContext BuildContext { get; set; }
}
