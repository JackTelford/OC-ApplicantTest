using Microsoft.AspNetCore.Mvc.ModelBinding;

namespace CloudSolutions.Surveys.ViewModels;

public class InterviewPageHeaderViewModel
{
    [BindNever]
    public string Title { get; set; }

    [BindNever]
    public string Description { get; set; }
}
