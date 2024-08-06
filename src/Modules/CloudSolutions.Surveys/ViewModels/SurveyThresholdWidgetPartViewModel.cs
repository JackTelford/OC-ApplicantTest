using CloudSolutions.Surveys.Models;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using Microsoft.AspNetCore.Mvc.Rendering;

namespace CloudSolutions.Surveys.ViewModels;

public class SurveyThresholdWidgetPartViewModel
{
    public IList<SurveyThresholdWidgetResponseEntry> Responses { get; set; }

    [BindNever]
    public IEnumerable<SelectListItem> AvailableSurveys { get; set; }

    public int TotalDaysToView { get; set; }

    public int TotalMinutesToCache { get; set; }

    public string SelectedSurveyId { get; set; }
}
