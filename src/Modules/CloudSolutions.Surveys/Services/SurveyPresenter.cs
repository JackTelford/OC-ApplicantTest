using System.Globalization;
using CloudSolutions.Surveys.Core;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.Extensions.Localization;
using OrchardCore.ContentManagement;
using OrchardCore.ContentManagement.Records;
using OrchardCore.Modules;
using YesSql;

namespace CloudSolutions.Surveys.Services;

public sealed class SurveyPresenter : ISurveyPresenter
{
    private readonly ISession _session;
    private readonly ILocalClock _localClock;

    internal readonly IStringLocalizer S;

    public SurveyPresenter(
        ISession session,
        ILocalClock localClock,
        IStringLocalizer<SurveyPresenter> stringLocalizer)
    {
        _session = session;
        _localClock = localClock;
        S = stringLocalizer;
    }

    public async Task<IEnumerable<SelectListItem>> GetSelectListItemsAsync()
    {
        var surveys = await _session.Query<ContentItem, ContentItemIndex>(x => x.ContentType == SurveyConstants.SurveyContentType && x.Published).ListAsync();

        return surveys.OrderBy(x => x.DisplayText).Select(x => new SelectListItem(x.DisplayText, x.ContentItemId));
    }

    public async Task<IEnumerable<SelectListItem>> GetVersionsSelectListItemsAsync()
    {
        var surveys = await _session.Query<ContentItem, ContentItemIndex>(x => x.ContentType == SurveyConstants.SurveyContentType && x.Published)
                                    .ListAsync();

        var groups = surveys.GroupBy(x => x.ContentItemId)
                            .Select(x => new
                            {
                                ContentItemId = x.Key,
                                ContentItems = x.Select(x => x).OrderBy(x => x.PublishedUtc).ToList()
                            }).ToList();

        var items = new List<SelectListItem>();

        foreach (var group in groups)
        {
            var itemGroup = new SelectListGroup()
            {
                Name = group.ContentItems.First().DisplayText
            };

            // if atleast one version with a duplicate title, we need to group them and break them down by published at
            var totalDistinctTitles = group.ContentItems.Select(x => x.DisplayText).Distinct().Count();

            var appendVersionName = totalDistinctTitles != group.ContentItems.Count;

            foreach (var survey in group.ContentItems)
            {
                var item = new SelectListItem(survey.DisplayText, survey.ContentItemVersionId);

                if (appendVersionName)
                {
                    var publishedAt = await _localClock.ConvertToLocalAsync(survey.PublishedUtc ?? survey.CreatedUtc ?? DateTime.UtcNow);

                    item.Text = S["Published At {0}", publishedAt.ToString("g", CultureInfo.InvariantCulture)];
                    item.Group = itemGroup;
                }

                items.Add(item);
            }
        }

        return items.OrderBy(x => x.Group != null ? x.Group.Name : x.Text);
    }
}
