using Microsoft.AspNetCore.Mvc.ModelBinding;
using OrchardCore.DisplayManagement;

namespace CloudSolutions.Surveys.ViewModels;

public class InterviewPageViewModel : SaveInterviewViewModel
{
    [BindNever]
    public bool CanGoBack { get; set; }

    [BindNever]
    public bool IsLastPage { get; set; }

    [BindNever]
    public IShape PageShape { get; set; }
}
