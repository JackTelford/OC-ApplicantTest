using Microsoft.AspNetCore.Mvc.Rendering;

namespace CloudSolutions.Surveys.Core;

public interface ISurveyPresenter
{
    Task<IEnumerable<SelectListItem>> GetSelectListItemsAsync();

    Task<IEnumerable<SelectListItem>> GetVersionsSelectListItemsAsync();
}
