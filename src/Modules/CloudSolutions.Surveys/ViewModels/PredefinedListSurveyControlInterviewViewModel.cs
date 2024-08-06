using CloudSolutions.Surveys.Core.Models;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using OrchardCore.ContentFields.Settings;

namespace CloudSolutions.Surveys.ViewModels;

public class PredefinedListSurveyControlInterviewViewModel : SurveyControlInterviewViewModel
{
    public string[] Values { get; set; }

    [BindNever]
    public bool Multiple { get; set; }

    [BindNever]
    public int? MinLength { get; set; }

    [BindNever]
    public int? MaxLength { get; set; }

    [BindNever]
    public EditorOption Editor { get; set; }

    [BindNever]
    public ListControlValueOption[] RawOptions { get; set; }
}
