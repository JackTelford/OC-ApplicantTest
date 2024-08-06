using Microsoft.Extensions.Options;
using OrchardCore.ResourceManagement;

namespace CloudSolutions.Surveys;

public sealed class SurveyResourceManagementManifest : IConfigureOptions<ResourceManagementOptions>
{
    public static string SurveyOptionsEditor = $"{Startup.ModuleName}.OptionsEditor";
    public static string SurveyEditName = $"{Startup.ModuleName}.EditSurvey";
    public static string ClipboardEditName = $"{Startup.ModuleName}.Clipboard";

    private static readonly ResourceManifest _manifest;

    static SurveyResourceManagementManifest()
    {
        _manifest = new ResourceManifest();

        _manifest.DefineScript(SurveyOptionsEditor)
                .SetUrl($"~/{Startup.ModuleName}/js/options-editor.min.js", $"~/{Startup.ModuleName}/js/options-editor.js")
                .SetDependencies("vuedraggable")
                .SetVersion("1.0.0");

        _manifest.DefineScript(SurveyEditName)
                .SetUrl($"~/{Startup.ModuleName}/js/edit-surveys.min.js", $"~/{Startup.ModuleName}/js/edit-surveys.js")
                .SetVersion("1.0.0");

        _manifest.DefineScript(ClipboardEditName)
                .SetUrl($"~/{Startup.ModuleName}/js/clipboard.min.js", $"~/{Startup.ModuleName}/js/clipboard.js")
                .SetVersion("1.0.0");
    }

    public void Configure(ResourceManagementOptions options)
    {
        options.ResourceManifests.Add(_manifest);
    }

    public static IResourceManager InjectResource(IResourceManager resourceManager)
    {
        resourceManager.RegisterResource("script", SurveyOptionsEditor).AtFoot();

        return resourceManager;
    }

    public static IResourceManager InjectEditSurveyResource(IResourceManager resourceManager)
    {
        resourceManager.RegisterResource("script", SurveyEditName).AtFoot();

        return resourceManager;
    }

    public static IResourceManager InjectClipboardResource(IResourceManager resourceManager)
    {
        resourceManager.RegisterResource("script", ClipboardEditName).AtFoot();

        return resourceManager;
    }

}
