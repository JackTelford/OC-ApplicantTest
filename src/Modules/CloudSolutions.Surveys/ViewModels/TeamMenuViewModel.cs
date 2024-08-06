using Microsoft.AspNetCore.Mvc.ModelBinding;
using Microsoft.AspNetCore.Mvc.Rendering;

namespace CloudSolutions.Surveys.ViewModels;

public class TeamMenuViewModel
{
    public string TeamId { get; set; }

    [BindNever]
    public IEnumerable<SelectListItem> Teams { get; set; }
}
