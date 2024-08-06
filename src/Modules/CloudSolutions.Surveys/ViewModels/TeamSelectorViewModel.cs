using Microsoft.AspNetCore.Mvc.ModelBinding;
using Microsoft.AspNetCore.Mvc.Rendering;

namespace CloudSolutions.Surveys.ViewModels;

public class TeamSelectorViewModel
{
    public bool IsHidden { get; set; }

    public string CurrentTeamId { get; set; }

    [BindNever]
    public IEnumerable<SelectListItem> Teams { get; set; }
}
