using Microsoft.AspNetCore.Mvc.ModelBinding;
using Microsoft.AspNetCore.Mvc.Rendering;

namespace CloudSolutions.Surveys.ViewModels;

public class TeamSelectMenuViewModel
{
    public string TeamId { get; set; }

    [BindNever]
    public IEnumerable<SelectListItem> Options { get; set; }

    [BindNever]
    public string WidgetContentItemId { get; internal set; }
}
