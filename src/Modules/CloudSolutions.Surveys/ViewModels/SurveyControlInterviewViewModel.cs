using Microsoft.AspNetCore.Mvc.ModelBinding;

namespace CloudSolutions.Surveys.ViewModels;

public class SurveyControlInterviewViewModel
{
    [BindNever]
    public string Hint { get; set; }

    [BindNever]
    public string Title { get; set; }

    [BindNever]
    public string Description { get; set; }

    [BindNever]
    public bool IsRequired { get; set; }
}
