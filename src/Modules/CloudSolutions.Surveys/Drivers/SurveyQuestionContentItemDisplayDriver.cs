using System.Text.Encodings.Web;
using CloudSolutions.Surveys.Core;
using CloudSolutions.Surveys.Core.Models;
using CloudSolutions.Surveys.ViewModels;
using Fluid.Values;
using GraphQL;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Localization;
using Microsoft.Extensions.Logging;
using OrchardCore.ContentManagement;
using OrchardCore.ContentManagement.Display;
using OrchardCore.ContentManagement.Display.ContentDisplay;
using OrchardCore.ContentManagement.Metadata;
using OrchardCore.ContentManagement.Metadata.Models;
using OrchardCore.Contents;
using OrchardCore.DisplayManagement.Handlers;
using OrchardCore.DisplayManagement.Views;
using OrchardCore.Flows.Models;
using OrchardCore.Flows.ViewModels;
using OrchardCore.Html.Settings;
using OrchardCore.Liquid;
using OrchardCore.Security.Permissions;
using OrchardCore.Shortcodes.Services;
using Shortcodes;

namespace CloudSolutions.Surveys.Drivers;

public sealed class SurveyQuestionContentItemDisplayDriver : ContentDisplayDriver
{
    private readonly ILiquidTemplateManager _liquidTemplateManager;
    private readonly IShortcodeService _shortcodeService;
    private readonly HtmlEncoder _htmlEncoder;
    private readonly ILogger _logger;
    private readonly IContentDefinitionManager _contentDefinitionManager;
    private readonly IServiceProvider _serviceProvider;
    private readonly IHttpContextAccessor _httpContextAccessor;
    private readonly IAuthorizationService _authorizationService;

    private IContentManager _contentManager;

    internal readonly IStringLocalizer S;

    public SurveyQuestionContentItemDisplayDriver(
        ILiquidTemplateManager liquidTemplateManager,
        IShortcodeService shortcodeService,
        HtmlEncoder htmlEncoder,

        ILogger<SurveyQuestionContentItemDisplayDriver> logger,
        IStringLocalizer<SurveyQuestionContentItemDisplayDriver> stringLocalizer,
        IContentDefinitionManager contentDefinitionManager,
        IServiceProvider serviceProvider,
        IHttpContextAccessor httpContextAccessor,
        IAuthorizationService authorizationService)
    {
        _liquidTemplateManager = liquidTemplateManager;
        _shortcodeService = shortcodeService;
        _logger = logger;
        S = stringLocalizer;
        _contentDefinitionManager = contentDefinitionManager;
        _serviceProvider = serviceProvider;
        _htmlEncoder = htmlEncoder;
        _httpContextAccessor = httpContextAccessor;
        _authorizationService = authorizationService;
    }

    public override bool CanHandleModel(ContentItem model)
    {
        return SurveyConstants.SurveyQuestionContentType == model.ContentType;
    }

    public override Task<IDisplayResult> EditAsync(ContentItem model, BuildEditorContext context)
    {
        if (!model.Has(SurveyConstants.Inputs))
        {
            model.Weld(SurveyConstants.Inputs, new BagPart());
        }

        var inputsPart = model.Get<BagPart>(SurveyConstants.Inputs);

        if (context.GroupId == SurveyConstants.InterviewContentType)
        {
            if (inputsPart?.ContentItems == null || inputsPart.ContentItems.Count == 0)
            {
                _logger.LogError("Unable to get the BagPart from the Question content Item to determine the question controls. This most likely to incomplete survey.");

                context.Updater.ModelState.AddModelError(string.Empty, S["Unable to find widgets on question. Ensure that the survey is designed with at least one page."]);

                return Task.FromResult<IDisplayResult>(null);
            }

            // compose the questions
            return Task.FromResult<IDisplayResult>(Initialize<InterviewQuestionViewModel>(nameof(InterviewQuestionViewModel), async vm =>
            {
                vm.QuestionId = model.ContentItemId;
                vm.Title = model.DisplayText;
                vm.Controls = inputsPart.ContentItems;
                vm.BuildContext = context;

                var contentType = await _contentDefinitionManager.GetTypeDefinitionAsync(model.ContentType);

                if (contentType == null)
                {
                    _logger.LogError("Unable to get the ContentTypeDefinition from {ContentType}. Most likely the definition was removed from the database.", model.ContentType);

                    return;
                }

                var contentTypePartDefinition = contentType.Parts?.FirstOrDefault(x => x.Name == nameof(SurveyQuestionPart));

                if (contentTypePartDefinition == null)
                {
                    _logger.LogError("Unable to get the ContentTypeDefinition from {ContentType} with the name {PartName}. Most likely the definition was removed from the database.", model.ContentType, nameof(SurveyQuestionPart));

                    return;
                }

                var questionPart = model.As<SurveyQuestionPart>() ?? new SurveyQuestionPart();

                vm.Description = await BuildViewModelAsync(questionPart.Description?.Html, model, contentTypePartDefinition);

            }).Location("Content:1")
            .OnGroup(context.GroupId)); // .Prefix(model.ContentItemId)
        }

        return Task.FromResult<IDisplayResult>(Initialize<BagPartEditViewModel>("BagPart_Edit", async m =>
        {
            m.BagPart = inputsPart;
            m.Updater = context.Updater;
            m.ContainedContentTypeDefinitions = (await _contentDefinitionManager.ListTypeDefinitionsAsync())
            .Where(t => t.StereotypeEquals("SurveyControl"))
            .ToList();

            m.AccessibleWidgets = await GetAccessibleWidgetsAsync(inputsPart.ContentItems, _contentDefinitionManager);

        }).Location("Parts:100"));
    }

    public override async Task<IDisplayResult> UpdateAsync(ContentItem model, UpdateEditorContext context)
    {
        if (!model.Has(SurveyConstants.Inputs))
        {
            model.Weld(SurveyConstants.Inputs, new BagPart());
        }

        var part = model.Get<BagPart>(SurveyConstants.Inputs);

        var vm = new BagPartEditViewModel()
        {
            BagPart = part
        };

        // to prevent circular reference
        _contentManager ??= _serviceProvider.GetRequiredService<IContentManager>();

        var contentItemDisplayManager = _serviceProvider.GetRequiredService<IContentItemDisplayManager>();

        await context.Updater.TryUpdateModelAsync(vm, Prefix);

        var contentItems = new List<ContentItem>();
        for (var i = 0; i < vm.Prefixes.Length; i++)
        {
            var contentItem = await _contentManager.NewAsync(vm.ContentTypes[i]);
            var existingContentItem = part.ContentItems.FirstOrDefault(x => string.Equals(x.ContentItemId, vm.ContentItems[i], StringComparison.OrdinalIgnoreCase));
            // When the content item already exists merge its elements to preserve nested content item ids.
            // All of the data for these merged items is then replaced by the model values on update, while a nested content item id is maintained.
            // This prevents nested items which rely on the content item id, i.e. the media attached field, losing their reference point.
            if (existingContentItem != null)
            {
                contentItem.ContentItemId = vm.ContentItems[i];
                contentItem.Merge(existingContentItem);
            }

            await contentItemDisplayManager.UpdateEditorAsync(contentItem, context.Updater, context.IsNew, htmlFieldPrefix: vm.Prefixes[i]);

            contentItems.Add(contentItem);
        }

        part.ContentItems = contentItems;

        model.Alter<BagPart>(SurveyConstants.Inputs, p =>
        {
            p.ContentItems = contentItems;
        });

        return await EditAsync(model, context);
    }

    private async Task<bool> AuthorizeAsync(IContentDefinitionManager contentDefinitionManager, Permission permission, ContentItem contentItem)
    {
        var contentTypeDefinition = await contentDefinitionManager.GetTypeDefinitionAsync(contentItem.ContentType);

        if (contentTypeDefinition?.IsSecurable() ?? false)
        {
            return true;
        }

        return await AuthorizeAsync(permission, contentItem);
    }

    private async Task<bool> AuthorizeAsync(Permission permission, ContentItem contentItem)
    {
        return await _authorizationService.AuthorizeAsync(_httpContextAccessor.HttpContext.User, permission, contentItem);
    }

    private async ValueTask<string> BuildViewModelAsync(string rawHtml, ContentItem contentItem, ContentTypePartDefinition typePartDefinition)
    {
        if (string.IsNullOrWhiteSpace(rawHtml))
        {
            return null;
        }

        var settings = typePartDefinition?.GetSettings<HtmlBodyPartSettings>() ?? new HtmlBodyPartSettings();

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

    /*
    public override async Task<IDisplayResult> UpdateAsync(ContentItem model, UpdateEditorContext context)
    {
        if (!model.Has(SurveyConstants.Inputs))
        {
            model.Weld(SurveyConstants.Inputs, new BagPart());
        }

        
        // var driver = _serviceProvider.GetRequiredService<BagPartDisplayDriver>();
        // var contentDefinitionManager = _serviceProvider.GetRequiredService<IContentDefinitionManager>();
        // 
        // var bagPart = model.Get<BagPart>(SurveyConstants.Inputs);
        // 
        // var contentTypeDefinition = contentDefinitionManager.GetTypeDefinition(model.ContentType);
        // var partDefinition = contentDefinitionManager.GetPartDefinition("BagPart");
        // var contentTypePartDefinition = new ContentTypePartDefinition(SurveyConstants.Inputs, partDefinition, new JObject());
        // 
        // var t = new UpdatePartEditorContext(contentTypePartDefinition, context);
        // 
        // return await driver.UpdateAsync(bagPart, t);
        

        
        var vm = new BagPartEditViewModel();

        if (await context.Updater.TryUpdateModelAsync(vm, Prefix))
        {
            // do we need to alter the model?
        }

        return await EditAsync(model, context);
        
    }
    */

    private async Task<IEnumerable<BagPartWidgetViewModel>> GetAccessibleWidgetsAsync(IEnumerable<ContentItem> contentItems, IContentDefinitionManager contentDefinitionManager)
    {
        ArgumentNullException.ThrowIfNull(contentDefinitionManager, nameof(contentDefinitionManager));

        var widgets = new List<BagPartWidgetViewModel>();

        if (contentItems == null)
        {
            return widgets;
        }

        foreach (var contentItem in contentItems)
        {
            var widget = new BagPartWidgetViewModel
            {
                ContentItem = contentItem,
                Viewable = true,
                Editable = true,
                Deletable = true,
            };

            var contentTypeDefinition = await contentDefinitionManager.GetTypeDefinitionAsync(contentItem.ContentType);

            if (contentTypeDefinition?.IsSecurable() ?? false)
            {
                widget.Viewable = await AuthorizeAsync(CommonPermissions.ViewContent, contentItem);
                widget.Editable = await AuthorizeAsync(CommonPermissions.EditContent, contentItem);
                widget.Deletable = await AuthorizeAsync(CommonPermissions.DeleteContent, contentItem);
            }

            widget.ContentTypeDefinition = contentTypeDefinition;

            if (widget.Editable || widget.Viewable)
            {
                widgets.Add(widget);
            }
        }

        return widgets;
    }
}
