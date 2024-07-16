using OrchardCore.ContentManagement.Metadata;
using OrchardCore.ContentManagement.Metadata.Settings;
using OrchardCore.Data.Migration;

namespace ApplicantTest.Migrations;
public class ApplicantTestMigrations : DataMigration
{
    private readonly IContentDefinitionManager _contentDefinitionManager;

    public ApplicantTestMigrations(IContentDefinitionManager contentDefinitionManager)
    {
        _contentDefinitionManager = contentDefinitionManager;
    }

    public async Task<int> CreateAsync()
    {
        await _contentDefinitionManager.AlterPartDefinitionAsync("ApplicantTestPart", part => part
           .Attachable()
           .WithDisplayName("ApplicantTest App")
           .WithDescription("Part to Attach to display the Applicant testing App.")
        );

        return 1;
    }
}
