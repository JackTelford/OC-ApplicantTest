using OrchardCore.ContentManagement.Metadata;
using OrchardCore.ContentManagement.Metadata.Settings;
using OrchardCore.Data.Migration;

namespace CloudSolutions.Surveys.DesktopSimulator.Migrations;

public sealed class DesktopSimulatorMigrations : DataMigration
{
    private readonly IContentDefinitionManager _contentDefinitionManager;

    public DesktopSimulatorMigrations(IContentDefinitionManager contentDefinitionManager)
    {
        _contentDefinitionManager = contentDefinitionManager;
    }

    public async Task<int> CreateAsync()
    {
        await _contentDefinitionManager.AlterTypeDefinitionAsync("DesktopSimulator", type => type
            .WithPart("DesktopSimulatorPart")
            .Stereotype("SurveyControl")
        );

        await _contentDefinitionManager.AlterPartDefinitionAsync("DesktopSimulatorPart", part => part
           .Attachable()
           .WithDisplayName("DesktopSimulator App")
           .WithDescription("Part to Attach to display the DesktopSimulator App.")
        );
        return 1;
    }
}
