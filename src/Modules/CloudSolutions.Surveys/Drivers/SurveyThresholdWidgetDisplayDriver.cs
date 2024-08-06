using CloudSolutions.Common;
using CloudSolutions.Surveys.Core;
using CloudSolutions.Surveys.Indexes;
using CloudSolutions.Surveys.Models;
using CloudSolutions.Surveys.ViewModels;
using CrestApps.Components;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.Extensions.Caching.Distributed;
using Microsoft.Extensions.Localization;
using OrchardCore.ContentManagement;
using OrchardCore.ContentManagement.Display.ContentDisplay;
using OrchardCore.ContentManagement.Display.Models;
using OrchardCore.ContentManagement.Records;
using OrchardCore.DisplayManagement.ModelBinding;
using OrchardCore.DisplayManagement.Views;
using OrchardCore.Modules;
using OrchardCore.Mvc.ModelBinding;
using OrchardCore.Users.Indexes;
using OrchardCore.Users.Models;
using YesSql;
using YesSql.Services;

namespace CloudSolutions.Surveys.Drivers;

public sealed class SurveyThresholdWidgetDisplayDriver : ContentPartDisplayDriver<SurveyThresholdWidgetPart>
{
    private const string _cacheKey = "SurveyThresholdWidgetPart";

    private readonly IDistributedObjectCache _distributedObjectCache;
    private readonly ISession _session;
    private readonly ILocalClock _localClock;
    private readonly IDisplayNameProvider _displayNameProvider;

    internal readonly IStringLocalizer S;

    public SurveyThresholdWidgetDisplayDriver(
        IDistributedObjectCache distributedObjectCache,
        ISession session,
        ILocalClock localClock,
        IDisplayNameProvider displayNameProvider,
        IStringLocalizer<SurveyThresholdWidgetDisplayDriver> stringLocalizer)
    {
        _distributedObjectCache = distributedObjectCache;
        _session = session;
        _localClock = localClock;
        _displayNameProvider = displayNameProvider;
        S = stringLocalizer;
    }

    public override async Task<IDisplayResult> DisplayAsync(SurveyThresholdWidgetPart part, BuildPartDisplayContext context)
    {
        return await Task.FromResult<IDisplayResult>(Initialize<SurveyThresholdWidgetPartViewModel>(GetDisplayShapeType(context), async model =>
        {
            var modelCacheKey = GetCacheKey(part);
            var cached = await _distributedObjectCache.GetAsync<SurveyThresholdWidgetPartViewModel>(modelCacheKey);

            if (cached != null)
            {
                model.Responses = cached.Responses;
                return;
            }

            var now = await _localClock.LocalNowAsync;
            var startAt = now.Date.AddDays(part.TotalDaysToView * -1);
            var startAtUtc = await _localClock.ConvertToUtcAsync(startAt);

            var query = _session.QueryIndex<InterviewBelowThresholdIndex>
            (index => index.Response <= index.Threshold && index.InterviewedAt >= startAtUtc);

            if (!string.IsNullOrEmpty(part.SurveyContentItemId))
            {
                query = query.Where(survey => survey.SurveyContentItemId == part.SurveyContentItemId);
            }

            var responses = await query.OrderByDescending(index => index.InterviewedAt)
            .ListAsync();

            var userIds = responses.Select(response => response.UserId).Distinct().ToArray();
            var users = await _session.Query<User, UserIndex>(user => user.UserId.IsIn(userIds)).ListAsync();

            var responseEntries = new List<SurveyThresholdWidgetResponseEntry>();

            foreach (var response in responses)
            {
                var user = users.FirstOrDefault(user => user.UserId == response.UserId);

                if (user == null)
                {
                    continue;
                }

                responseEntries.Add(new SurveyThresholdWidgetResponseEntry
                {
                    UserDisplayName = await _displayNameProvider.GetAsync(user),
                    Title = response.Title,
                    Response = response.Response.Value,
                    InterviewedAtLocal = (await _localClock.ConvertToLocalAsync(response.InterviewedAt.Value)).DateTime,
                });
            }

            model.Responses = responseEntries
             .OrderBy(user => user.UserDisplayName)
             .ThenBy(InterviewedAt => InterviewedAt.InterviewedAtLocal)
             .ToArray();

            if (part.TotalMinutesToCache > 0)
            {
                await _distributedObjectCache.SetAsync(modelCacheKey, model, new DistributedCacheEntryOptions()
                {
                    AbsoluteExpirationRelativeToNow = TimeSpan.FromMinutes(part.TotalMinutesToCache),
                });
            }
        }).Location("DetailAdmin", "Content"));
    }

    public override IDisplayResult Edit(SurveyThresholdWidgetPart part, BuildPartEditorContext context)
    {
        return Initialize<SurveyThresholdWidgetPartViewModel>(GetEditorShapeType(context), async model =>
        {
            model.TotalDaysToView = context.IsNew ? 7 : part.TotalDaysToView;
            model.TotalMinutesToCache = context.IsNew ? 60 : part.TotalMinutesToCache;
            model.SelectedSurveyId = part.SurveyContentItemId;

            var surveys = await _session.Query<ContentItem, ContentItemIndex>
            (index => index.Published && index.ContentType == SurveyConstants.SurveyContentType)
             .ListAsync();

            model.AvailableSurveys = surveys.Select(survey => new SelectListItem
            {
                Text = survey.DisplayText,
                Value = survey.ContentItemId
            }).OrderBy(item => item.Text);
        }).Location("DetailAdmin", "Content");
    }

    public override async Task<IDisplayResult> UpdateAsync(SurveyThresholdWidgetPart part, IUpdateModel updater, UpdatePartEditorContext context)
    {
        var model = new SurveyThresholdWidgetPartViewModel();

        await updater.TryUpdateModelAsync(model, Prefix);

        if (model.TotalDaysToView < 1 || model.TotalDaysToView > 30)
        {
            updater.ModelState.AddModelError(Prefix, nameof(model.TotalDaysToView), S["Total days to view must be between 1 and 30."]);
        }

        part.TotalDaysToView = model.TotalDaysToView;
        part.TotalMinutesToCache = model.TotalMinutesToCache;
        part.SurveyContentItemId = model.SelectedSurveyId;

        if (updater.ModelState.IsValid)
        {
            await _distributedObjectCache.RemoveAsync(GetCacheKey(part));
        }

        return Edit(part, context);
    }

    private static string GetCacheKey(SurveyThresholdWidgetPart part)
    {
        return $"{_cacheKey}_{part.ContentItem.ContentItemId}";
    }
}
