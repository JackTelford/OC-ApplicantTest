using CloudSolutions.Surveys.Core.Models;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using Microsoft.AspNetCore.Mvc.Rendering;

namespace CloudSolutions.Surveys.ViewModels;

public class SurveyRestrictionViewModel
{
    public bool EnableDailyRestriction { get; set; }

    public DailyRestrictionViewModel[] DailyRestrictions { get; set; }
}

public class DailyRestrictionViewModel
{
    public DayOfWeek DayOfWeek { get; set; }

    public DailyRestrictionType Type { get; set; }

    public TimeSpan? From { get; set; }

    public TimeSpan? To { get; set; }

    [BindNever]
    public string Title { get; set; }

    [BindNever]
    public IEnumerable<SelectListItem> Types { get; set; }
}
