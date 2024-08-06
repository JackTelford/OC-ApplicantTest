using CloudSolutions.Surveys.Core.Models;
using CloudSolutions.Surveys.ViewModels;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.Extensions.Localization;
using OrchardCore.ContentManagement.Display.ContentDisplay;
using OrchardCore.ContentManagement.Display.Models;
using OrchardCore.DisplayManagement.ModelBinding;
using OrchardCore.DisplayManagement.Views;
using OrchardCore.Mvc.ModelBinding;
using OrchardCore.ResourceManagement;

namespace CloudSolutions.Surveys.Drivers;

public sealed class SurveyRestrictionPartDisplayDriver : ContentPartDisplayDriver<SurveyRestrictionPart>
{
    private readonly IResourceManager _resourceManager;

    internal readonly IStringLocalizer S;

    public SurveyRestrictionPartDisplayDriver(
        IResourceManager resourceManager,
        IStringLocalizer<SurveyRestrictionPartDisplayDriver> stringLocalizer)
    {
        _resourceManager = resourceManager;
        S = stringLocalizer;
    }

    public override IDisplayResult Edit(SurveyRestrictionPart part, BuildPartEditorContext context)
    {
        SurveyResourceManagementManifest.InjectEditSurveyResource(_resourceManager);

        return Initialize<SurveyRestrictionViewModel>("SurveyRestrictionPart_Edit", model =>
        {
            model.EnableDailyRestriction = part.EnableDailyRestriction;
            model.DailyRestrictions =
            [
                new DailyRestrictionViewModel()
                {
                    DayOfWeek = DayOfWeek.Sunday,
                    Title = S["Sunday"],
                    Types =
                    [
                        new SelectListItem(S["Allow All"], nameof(DailyRestrictionType.AllowAll)),
                        new SelectListItem(S["Prevent All"], nameof(DailyRestrictionType.PreventAll)),
                        new SelectListItem(S["Limit Time"], nameof(DailyRestrictionType.LimitTime)),
                    ],
                },
                new DailyRestrictionViewModel()
                {
                    DayOfWeek = DayOfWeek.Monday,
                    Title = S["Monday"],
                    Types =
                    [
                        new SelectListItem(S["Allow All"], nameof(DailyRestrictionType.AllowAll)),
                        new SelectListItem(S["Prevent All"], nameof(DailyRestrictionType.PreventAll)),
                        new SelectListItem(S["Limit Time"], nameof(DailyRestrictionType.LimitTime)),
                    ],
                },
                new DailyRestrictionViewModel()
                {
                    DayOfWeek = DayOfWeek.Tuesday,
                    Title = S["Tuesday"],
                    Types =
                    [
                        new SelectListItem(S["Allow All"], nameof(DailyRestrictionType.AllowAll)),
                        new SelectListItem(S["Prevent All"], nameof(DailyRestrictionType.PreventAll)),
                        new SelectListItem(S["Limit Time"], nameof(DailyRestrictionType.LimitTime)),
                    ],
                },
                new DailyRestrictionViewModel()
                {
                    DayOfWeek = DayOfWeek.Wednesday,
                    Title = S["Wednesday"],
                    Types =
                    [
                        new SelectListItem(S["Allow All"], nameof(DailyRestrictionType.AllowAll)),
                        new SelectListItem(S["Prevent All"], nameof(DailyRestrictionType.PreventAll)),
                        new SelectListItem(S["Limit Time"], nameof(DailyRestrictionType.LimitTime)),
                    ],
                },
                new DailyRestrictionViewModel()
                {
                    DayOfWeek = DayOfWeek.Thursday,
                    Title = S["Thursday"],
                    Types =
                    [
                        new SelectListItem(S["Allow All"], nameof(DailyRestrictionType.AllowAll)),
                        new SelectListItem(S["Prevent All"], nameof(DailyRestrictionType.PreventAll)),
                        new SelectListItem(S["Limit Time"], nameof(DailyRestrictionType.LimitTime)),
                    ],
                },
                new DailyRestrictionViewModel()
                {
                    DayOfWeek = DayOfWeek.Friday,
                    Title = S["Friday"],
                    Types =
                    [
                        new SelectListItem(S["Allow All"], nameof(DailyRestrictionType.AllowAll)),
                        new SelectListItem(S["Prevent All"], nameof(DailyRestrictionType.PreventAll)),
                        new SelectListItem(S["Limit Time"], nameof(DailyRestrictionType.LimitTime)),
                    ],
                },
                new DailyRestrictionViewModel()
                {
                    DayOfWeek = DayOfWeek.Saturday,
                    Title = S["Saturday"],
                    Types =
                    [
                        new SelectListItem(S["Allow All"], nameof(DailyRestrictionType.AllowAll)),
                        new SelectListItem(S["Prevent All"], nameof(DailyRestrictionType.PreventAll)),
                        new SelectListItem(S["Limit Time"], nameof(DailyRestrictionType.LimitTime)),
                    ],
                }
            ];

            if (part.DailyRestrictions != null)
            {
                foreach (var dailyRestriction in part.DailyRestrictions)
                {
                    var m = model.DailyRestrictions.FirstOrDefault(x => x.DayOfWeek == dailyRestriction.Key);

                    if (m == null)
                    {
                        continue;
                    }

                    m.Type = dailyRestriction.Value.Type;
                    m.From = dailyRestriction.Value.From;
                    m.To = dailyRestriction.Value.To;
                }
            }
        });
    }

    public override async Task<IDisplayResult> UpdateAsync(SurveyRestrictionPart part, IUpdateModel updater, UpdatePartEditorContext context)
    {
        var model = new SurveyRestrictionViewModel();

        await updater.TryUpdateModelAsync(model, Prefix);

        part.EnableDailyRestriction = model.EnableDailyRestriction;

        if (model.EnableDailyRestriction)
        {
            part.DailyRestrictions ??= [];

            for (var i = 0; i < model.DailyRestrictions.Length; i++)
            {
                var item = model.DailyRestrictions[i];

                if (item.Type == DailyRestrictionType.LimitTime)
                {
                    if (!item.From.HasValue)
                    {
                        updater.ModelState.AddModelError(Prefix, $"{nameof(model.DailyRestrictions)}[{i}].{nameof(DailyRestriction.From)}", S["The From value is required."]);
                    }

                    if (!item.To.HasValue)
                    {
                        updater.ModelState.AddModelError(Prefix, $"{nameof(model.DailyRestrictions)}[{i}].{nameof(DailyRestriction.To)}", S["The To value is required."]);
                    }

                    if (item.From.HasValue && item.To.HasValue && item.From > item.To)
                    {
                        updater.ModelState.AddModelError(Prefix, $"{nameof(model.DailyRestrictions)}[{i}].{nameof(DailyRestriction.To)}", S["The To value must be greater than From."]);
                    }
                }

                part.DailyRestrictions[item.DayOfWeek] = new DailyRestriction()
                {
                    Type = item.Type,
                    From = item.From,
                    To = item.To,
                };
            }
        }

        return Edit(part, context);
    }
}
