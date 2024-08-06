using System.Security.Claims;
using CloudSolutions.Surveys.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using OrchardCore.Admin.Models;
using OrchardCore.DisplayManagement.Handlers;
using OrchardCore.DisplayManagement.Views;
using OrchardCore.Security.Permissions;
using OrchardCore.Users;

namespace CloudSolutions.Surveys.Drivers;

public sealed class ReportSettingsNavbarDisplayDriver : DisplayDriver<Navbar>
{
    private readonly ReportParametersDocumentService _reportParametersDocumentService;
    private readonly IHttpContextAccessor _httpContextAccessor;
    private readonly IAuthorizationService _authorizationService;
    private readonly UserManager<IUser> _userManager;

    public ReportSettingsNavbarDisplayDriver(
        ReportParametersDocumentService reportParametersDocumentService,
        IHttpContextAccessor httpContextAccessor,
        IAuthorizationService authorizationService,
        UserManager<IUser> userManager)
    {
        _reportParametersDocumentService = reportParametersDocumentService;
        _httpContextAccessor = httpContextAccessor;
        _authorizationService = authorizationService;
        _userManager = userManager;
    }

    public override async Task<IDisplayResult> DisplayAsync(Navbar model, BuildDisplayContext context)
    {
        var parameterSettings = await _reportParametersDocumentService.GetAllAsync();

        var visibleItems = new List<ReportParameterSettings>();

        var user = await _userManager.GetUserAsync(_httpContextAccessor.HttpContext.User);

        if (user is null)
        {
            return null;
        }

        foreach (var settings in parameterSettings)
        {
            if (!settings.ShowOnNavbar)
            {
                continue;
            }

            var permission = GetPermission(settings);

            if (!await _authorizationService.AuthorizeAsync(_httpContextAccessor.HttpContext.User, permission))
            {
                continue;
            }

            if (settings.Owner == _httpContextAccessor.HttpContext.User.FindFirstValue(ClaimTypes.NameIdentifier))
            {
                // If you created the settings, you should see it by default.
                visibleItems.Add(settings);

                continue;
            }

            if (settings.RoleNames == null || settings.RoleNames.Length == 0)
            {
                continue;
            }

            foreach (var role in settings.RoleNames)
            {
                if (await _userManager.IsInRoleAsync(user, role))
                {
                    visibleItems.Add(settings);

                    break;
                }
            }
        }

        return View("ReportSettingsMenuItems", visibleItems)
            .RenderWhen(() => Task.FromResult(visibleItems.Count > 0))
            .Location("Detail", "Content");
    }

    private static Permission GetPermission(ReportParameterSettings settings)
    {
        if (settings.Type == ReportType.InterviewsData)
        {
            return SurveyReportPermission.RunInterviewDataReport;
        }

        return SurveyReportPermission.RunInterviewDataReportByTeam;
    }
}
