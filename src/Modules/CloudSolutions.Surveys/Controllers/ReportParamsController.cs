using System.Security.Claims;
using CloudSolutions.ContentRestrictions;
using CloudSolutions.General;
using CloudSolutions.Surveys.Core;
using CloudSolutions.Surveys.Models;
using CloudSolutions.Surveys.ViewModels;
using CloudSolutions.Teams;
using CloudSolutions.Teams.Models;
using CrestApps.Components;
using CrestApps.Components.ViewModels;
using CrestApps.Support;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Localization;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Localization;
using OrchardCore;
using OrchardCore.Admin;
using OrchardCore.ContentManagement;
using OrchardCore.ContentManagement.Records;
using OrchardCore.DisplayManagement.Notify;
using OrchardCore.Entities;
using OrchardCore.Modules;
using OrchardCore.Mvc.Core.Utilities;
using OrchardCore.Security.Services;
using OrchardCore.Settings;
using OrchardCore.Users.Indexes;
using OrchardCore.Users.Models;
using YesSql;
using YesSql.Services;

namespace CloudSolutions.Surveys.Controllers;

[Admin]
public sealed class ReportParamsController : Controller
{
    public static readonly string Name = typeof(ReportParamsController).ControllerName();

    private readonly IAccessibleUserService _accessibleUserService;
    private readonly ReportParametersDocumentService _reportParametersDocumentService;
    private readonly IDisplayNameProvider _displayNameProvider;
    private readonly ISiteService _siteService;
    private readonly IAuthorizationService _authorizationService;
    private readonly ILocalClock _clock;
    private readonly INotifier _notifier;
    private readonly ISession _session;
    private ITeamStore _teamStore;

    internal readonly IStringLocalizer S;
    internal readonly IHtmlLocalizer H;

    public ReportParamsController(
        IStringLocalizer<ReportParamsController> stringLocalizer,
        IAccessibleUserService accessibleUserService,
        ReportParametersDocumentService reportParametersDocumentService,
        IDisplayNameProvider displayNameProvider,
        ISiteService siteService,
        IAuthorizationService authorizationService,
        ILocalClock clock,
        INotifier notifier,
        IHtmlLocalizer<ReportParamsController> htmlLocalizer,
        ISession session)
    {
        _accessibleUserService = accessibleUserService;
        _reportParametersDocumentService = reportParametersDocumentService;
        _displayNameProvider = displayNameProvider;
        _siteService = siteService;
        _authorizationService = authorizationService;
        _clock = clock;
        _notifier = notifier;
        _session = session;
        S = stringLocalizer;
        H = htmlLocalizer;
    }

    public async Task<IActionResult> Index()
    {
        if (!await _authorizationService.AuthorizeAsync(User, SurveyReportPermission.ManageReportSettings))
        {
            return Forbid();
        }

        var models = await _reportParametersDocumentService.GetAllAsync();

        return View(models);
    }

    public async Task<IActionResult> Display(string id)
    {
        var settings = await _reportParametersDocumentService.GetAsync(id);

        if (settings == null)
        {
            return NotFound();
        }

        var now = await _clock.LocalNowAsync;
        var items = new Dictionary<string, object>();

        var fromKey = $"{nameof(InterviewsDataViewModel)}.{nameof(DateTimeRangeViewModel.From)}";
        var toKey = $"{nameof(InterviewsDataViewModel)}.{nameof(DateTimeRangeViewModel.To)}";

        if (!string.IsNullOrEmpty(settings.SurveyId))
        {
            var surveyKey = $"{nameof(InterviewsDataViewModel)}.{nameof(SurveyVersionMenuViewModel.VersionId)}";

            items.TryAdd(surveyKey, settings.SurveyId);
        }

        if (!string.IsNullOrEmpty(settings.IntervieweeId))
        {
            var userKey = $"{nameof(InterviewsDataViewModel)}.{nameof(IntervieweeMenuViewModel.UserId)}";

            items.TryAdd(userKey, settings.IntervieweeId);
        }

        if (settings.Range == ReportParameterTypes.WeekToDate)
        {
            var dayOfWeek = await _siteService.GetSiteDayOfWeekAsync();

            items.TryAdd(fromKey, now.Date.Date.StartOfWeek(dayOfWeek));
            items.TryAdd(toKey, now.DateTime.EndOfWeek(dayOfWeek));
        }
        else if (settings.Range == ReportParameterTypes.MonthToDate)
        {
            items.TryAdd(fromKey, now.Date.Date.StartOfMonth());
            items.TryAdd(toKey, now.DateTime.EndOfMonth());
        }
        else if (settings.Range == ReportParameterTypes.YearToDate)
        {
            items.TryAdd(fromKey, now.Date.Date.StartOfYear());
            items.TryAdd(toKey, now.DateTime.EndOfYear());
        }
        else if (settings.Range == ReportParameterTypes.LastWeek)
        {
            var dayOfWeek = await _siteService.GetSiteDayOfWeekAsync();

            items.TryAdd(fromKey, now.Date.Date.StartOfWeek(dayOfWeek).AddDays(-7));
            items.TryAdd(toKey, now.DateTime.EndOfWeek(dayOfWeek).AddDays(-7));
        }
        else if (settings.Range == ReportParameterTypes.LastMonth)
        {
            items.TryAdd(fromKey, now.Date.Date.StartOfMonth().AddMonths(-1));
            items.TryAdd(toKey, now.DateTime.EndOfMonth().AddMonths(-1));
        }
        else if (settings.Range == ReportParameterTypes.LastYear)
        {
            items.TryAdd(fromKey, now.Date.Date.StartOfYear().AddYears(-1));
            items.TryAdd(toKey, now.DateTime.EndOfYear().AddYears(-1));
        }
        else
        {
            items.TryAdd(fromKey, now.Date.Date);
            items.TryAdd(toKey, now.DateTime.EndOfDay());
        }

        if (settings.Type == ReportType.InterviewsData)
        {
            return RedirectToAction(nameof(ReportsController.InterviewsData), typeof(ReportsController).ControllerName(), items);
        }

        return RedirectToAction(nameof(TeamReportsController.InterviewsDataByTeam), typeof(TeamReportsController).ControllerName(), items);
    }

    public async Task<IActionResult> Create()
    {
        if (!await _authorizationService.AuthorizeAsync(User, SurveyReportPermission.ManageReportSettings))
        {
            return Forbid();
        }

        var model = new ReportParameterViewModel();

        await PopulateAsync(model);

        return View(model);
    }

    [HttpPost]
    public async Task<IActionResult> Create(ReportParameterViewModel model)
    {
        if (!await _authorizationService.AuthorizeAsync(User, SurveyReportPermission.ManageReportSettings))
        {
            return Forbid();
        }

        if (ModelState.IsValid)
        {
            var settings = new ReportParameterSettings()
            {
                Id = IdGenerator.GenerateId(),
                Title = model.Title,
                Description = model.Description,
                ShowOnNavbar = model.ShowOnNavbar,
                RoleNames = model.RoleNames,
                Owner = GetUserId(),
                Type = model.Type,
                Range = model.Range,
                SurveyId = model.SurveyId,
                IntervieweeId = model.IntervieweeId,
                TeamId = model.TeamId,
            };

            await _reportParametersDocumentService.UpdateAsync(settings);

            await _notifier.SuccessAsync(H["New settings was successfully added."]);

            return RedirectToAction(nameof(Index));
        }

        await PopulateAsync(model);

        return View(model);
    }

    public async Task<IActionResult> Edit(string id)
    {
        if (!await _authorizationService.AuthorizeAsync(User, SurveyReportPermission.ManageReportSettings))
        {
            return Forbid();
        }

        var settings = await _reportParametersDocumentService.GetAsync(id);

        if (settings == null)
        {
            return NotFound();
        }

        var model = new EditReportParameterViewModel()
        {
            Id = id,
            Title = settings.Title,
            Description = settings.Description,
            ShowOnNavbar = settings.ShowOnNavbar,
            RoleNames = settings.RoleNames,
            Type = settings.Type,
            Range = settings.Range,
            SurveyId = settings.SurveyId,
            IntervieweeId = settings.IntervieweeId,
            TeamId = settings.TeamId,
        };

        await PopulateAsync(model);

        return View(model);
    }

    [HttpPost]
    public async Task<IActionResult> Edit(EditReportParameterViewModel model)
    {
        if (!await _authorizationService.AuthorizeAsync(User, SurveyReportPermission.ManageReportSettings))
        {
            return Forbid();
        }

        if (ModelState.IsValid)
        {
            var settings = await _reportParametersDocumentService.GetAsync(model.Id);

            if (settings == null)
            {
                return NotFound();
            }

            settings.Title = model.Title;
            settings.Description = model.Description;
            settings.ShowOnNavbar = model.ShowOnNavbar;
            settings.RoleNames = model.RoleNames;
            settings.Type = model.Type;
            settings.Range = model.Range;
            settings.SurveyId = model.SurveyId;
            settings.IntervieweeId = model.IntervieweeId;
            settings.TeamId = model.TeamId;

            await _reportParametersDocumentService.UpdateAsync(settings);

            await _notifier.SuccessAsync(H["New settings was successfully updated."]);

            return RedirectToAction(nameof(Index));
        }

        await PopulateAsync(model);

        return View(model);
    }


    [HttpPost]
    public async Task<IActionResult> Delete(string id)
    {
        var settings = await _reportParametersDocumentService.GetAsync(id);

        if (settings == null)
        {
            return NotFound();
        }

        await _reportParametersDocumentService.DeleteAsync(id);

        await _notifier.SuccessAsync(H["Report settings was successfully removed."]);

        return RedirectToAction(nameof(Index));

    }
    private async Task PopulateAsync(ReportParameterViewModel model)
    {
        var userId = GetUserId();

        model.DateRanges =
        [
            new SelectListItem(S["Today"], nameof(ReportParameterTypes.Today)),
            new SelectListItem(S["Week to Date"], nameof(ReportParameterTypes.WeekToDate)),
            new SelectListItem(S["Month to Date"], nameof(ReportParameterTypes.MonthToDate)),
            new SelectListItem(S["Year to Date"], nameof(ReportParameterTypes.YearToDate)),
            new SelectListItem(S["Last Week"], nameof(ReportParameterTypes.LastWeek)),
            new SelectListItem(S["Last Month"], nameof(ReportParameterTypes.LastMonth)),
            new SelectListItem(S["Last Year"], nameof(ReportParameterTypes.LastYear)),
        ];

        model.Types =
        [
            new SelectListItem(S["Interviews Data"], nameof(ReportType.InterviewsData)),
            new SelectListItem(S["Interviews Data by Team"], nameof(ReportType.InterviewsDataByTeam)),
        ];

        var surveys = await _session.Query<ContentItem, ContentItemIndex>(q => q.Published && q.ContentType == SurveyConstants.SurveyContentType).ListAsync(); ;
        model.Surveys = surveys.Select(x => new SelectListItem(x.DisplayText, x.ContentItemVersionId));
        model.Interviewees = await GetIntervieweesMenuAsync();

        _teamStore ??= Request.HttpContext.RequestServices.GetService<ITeamStore>();

        if (_teamStore != null)
        {
            model.Teams = await _teamStore.GetAccessibleItemsAsync(userId);
        }

        var roleService = Request.HttpContext.RequestServices.GetService<IRoleService>();

        if (roleService is not null)
        {
            model.Roles = (await roleService.GetRoleNamesAsync())
                .Where(x => !RoleHelper.SystemRoleNames.Contains(x))
                .Select(x => new SelectListItem(x, x))
                .ToList();
        }
    }

    private string GetUserId()
    {
        return User.FindFirstValue(ClaimTypes.NameIdentifier);
    }

    private async Task<List<SelectListItem>> GetIntervieweesMenuAsync()
    {
        _teamStore ??= Request.HttpContext.RequestServices.GetService<ITeamStore>();

        IEnumerable<SelectListItem> teams = [];

        if (_teamStore != null)
        {
            teams = await _teamStore.GetItemsAsync();
        }

        var query = _session.Query<User, UserIndex>(x => x.IsEnabled);

        if (await _accessibleUserService.RestrictContentAsync())
        {
            var userIds = await _accessibleUserService.UserIdsAsync();

            query.With<UserIndex>(x => x.UserId.IsIn(userIds));
        }

        var users = await query.ListAsync();

        var userOptions = new List<SelectListItem>();
        var groups = new List<SelectListGroup>();

        foreach (var user in users)
        {
            var item = new SelectListItem()
            {
                Text = await _displayNameProvider.GetAsync(user),
                Value = user.UserId,
            };
            var teamPart = user.As<UserTeamPart>();

            if (teamPart?.TeamIds?.Length > 0)
            {
                var teamName = teams.FirstOrDefault(x => x.Value == teamPart.TeamIds[0])?.Text;

                var group = groups.FirstOrDefault(x => teamName != null && string.Equals(x.Name, teamName, StringComparison.OrdinalIgnoreCase));

                if (group == null)
                {
                    group = new SelectListGroup()
                    {
                        Name = teamName,
                    };

                    groups.Add(group);
                }

                item.Group = group;
            }

            userOptions.Add(item);
        }

        return userOptions;
    }
}
