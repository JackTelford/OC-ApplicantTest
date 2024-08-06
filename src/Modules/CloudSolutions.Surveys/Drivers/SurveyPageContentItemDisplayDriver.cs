using System.Text.Encodings.Web;
using CloudSolutions.Surveys.Core;
using CloudSolutions.Surveys.Core.Models;
using CloudSolutions.Surveys.ViewModels;
using Fluid.Values;
using Microsoft.Extensions.Localization;
using Microsoft.Extensions.Logging;
using OrchardCore.ContentManagement;
using OrchardCore.ContentManagement.Display.ContentDisplay;
using OrchardCore.ContentManagement.Metadata;
using OrchardCore.ContentManagement.Metadata.Models;
using OrchardCore.DisplayManagement.Handlers;
using OrchardCore.DisplayManagement.Views;
using OrchardCore.Flows.Models;
using OrchardCore.Html.Settings;
using OrchardCore.Liquid;
using OrchardCore.Shortcodes.Services;
using Shortcodes;

namespace CloudSolutions.Surveys.Drivers;

public sealed class SurveyPageContentItemDisplayDriver : ContentDisplayDriver
{
    private readonly ILiquidTemplateManager _liquidTemplateManager;
    private readonly IShortcodeService _shortcodeService;
    private readonly IContentDefinitionManager _contentDefinitionManager;
    private readonly HtmlEncoder _htmlEncoder;
    private readonly ILogger _logger;

    internal readonly IStringLocalizer S;

    public SurveyPageContentItemDisplayDriver(
        ILiquidTemplateManager liquidTemplateManager,
        IShortcodeService shortcodeService,
        IContentDefinitionManager contentDefinitionManager,
        HtmlEncoder htmlEncoder,
        ILogger<SurveyPageContentItemDisplayDriver> logger,
        IStringLocalizer<SurveyPageContentItemDisplayDriver> stringLocalizer)
    {
        _liquidTemplateManager = liquidTemplateManager;
        _shortcodeService = shortcodeService;
        _contentDefinitionManager = contentDefinitionManager;
        _htmlEncoder = htmlEncoder;
        _logger = logger;
        S = stringLocalizer;
    }

    public override bool CanHandleModel(ContentItem model)
    {
        return SurveyConstants.SurveyPageContentType == model.ContentType;
    }

    public override Task<IDisplayResult> EditAsync(ContentItem page, BuildEditorContext context)
    {
        if (SurveyConstants.InterviewContentType == context.GroupId)
        {
            context.Shape.Metadata.Alternates.Add("Content_Edit__SurveyPage__Interview");
            // TODO, rename this bag to Questions
            var questionBagPart = page.Get<BagPart>(SurveyConstants.Questions);

            if (questionBagPart == null || questionBagPart.ContentItems == null || questionBagPart.ContentItems.Count == 0)
            {
                _logger.LogError("Unable to get the BagPart from the page content Item to determine the page questions. This most likely to incomplete survey");

                context.Updater.ModelState.AddModelError(string.Empty, S["Unable to find page questions. Ensure that the survey is designed with at least one question is added to a page."]);

                return Task.FromResult<IDisplayResult>(null);
            }
            var pagePart = page.As<SurveyPagePart>();

            var pageHeaderShape = Initialize<InterviewPageHeaderViewModel>("InterviewPageHeader", async vm =>
            {
                vm.Title = page.DisplayText;
                var contentTypePartDefinition = (await _contentDefinitionManager.GetTypeDefinitionAsync(page.ContentType)).Parts.FirstOrDefault(x => x.Name == nameof(SurveyPagePart));

                vm.Description = await BuildViewModelAsync(pagePart?.Description?.Html, page, contentTypePartDefinition);
            }).Location("Header:1").OnGroup(context.GroupId);

            var pageBodyShape = Initialize<InterviewPageBodyViewModel>("InterviewPageBody", vm =>
            {
                vm.BuildContext = context;
                vm.Questions = questionBagPart.ContentItems;
            }).Location("Content:1").OnGroup(context.GroupId);

            return Task.FromResult<IDisplayResult>(Combine(pageHeaderShape, pageBodyShape));
        }

        return base.EditAsync(page, context);
    }

    private async ValueTask<string> BuildViewModelAsync(string rawHtml, ContentItem contentItem, ContentTypePartDefinition typePartDefinition)
    {
        if (string.IsNullOrWhiteSpace(rawHtml))
        {
            return null;
        }

        var settings = typePartDefinition.GetSettings<HtmlBodyPartSettings>();

        var html = rawHtml;

        if (!settings.SanitizeHtml)
        {
            html = await _liquidTemplateManager.RenderStringAsync(rawHtml,
                _htmlEncoder,
                null,
            new Dictionary<string, FluidValue>()
            {
                ["ContentItem"] = new ObjectValue(contentItem)
            });
        }

        return await _shortcodeService.ProcessAsync(html,
            new Context
            {
                ["ContentItem"] = contentItem,
                ["TypePartDefinition"] = typePartDefinition
            });
    }
}
