using CloudSolutions.Surveys.Controllers;
using CloudSolutions.Surveys.Core.Models;
using CloudSolutions.Surveys.ViewModels;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Routing;
using OrchardCore.ContentManagement.Display.ContentDisplay;
using OrchardCore.DisplayManagement.Views;
using OrchardCore.Mvc.Core.Utilities;
using OrchardCore.ResourceManagement;

namespace CloudSolutions.Surveys.Drivers;

public sealed class InterviewLinkPartDisplayDriver : ContentPartDisplayDriver<InterviewLinkPart>
{
    private readonly IResourceManager _resourceManager;
    private readonly LinkGenerator _linkGenerator;
    private readonly IHttpContextAccessor _httpContextAccessor;

    public InterviewLinkPartDisplayDriver(IResourceManager resourceManager, LinkGenerator linkGenerator, IHttpContextAccessor httpContextAccessor)
    {
        _resourceManager = resourceManager;
        _linkGenerator = linkGenerator;
        _httpContextAccessor = httpContextAccessor;
    }

    public override IDisplayResult Edit(InterviewLinkPart part)
    {
        SurveyResourceManagementManifest.InjectClipboardResource(_resourceManager);

        return Initialize<InterviewLinkPartViewModel>("InterviewLinkPart", viewModel =>
        {
            viewModel.ContentItem = part.ContentItem;
            viewModel.Link = _linkGenerator.GetPathByRouteValues(_httpContextAccessor.HttpContext, string.Empty, new
            {
                area = Startup.ModuleName,
                controller = typeof(InterviewsController).ControllerName(),
                action = nameof(InterviewsController.Start),
                surveyId = part.ContentItem.ContentItemId,
            });
        });
    }
}
