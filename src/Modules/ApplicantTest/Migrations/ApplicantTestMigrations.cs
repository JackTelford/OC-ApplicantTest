using ApplicantTest.Indexes;
using OrchardCore.ContentManagement.Metadata;
using OrchardCore.ContentManagement.Metadata.Settings;
using OrchardCore.Data.Migration;
using YesSql.Sql;

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

    public async Task<int> UpdateFrom1Async()
    {
        await _contentDefinitionManager.AlterPartDefinitionAsync("ApplicantTestPart", part => part
          .Attachable()
          .WithDisplayName("ApplicantTest App")
          .WithDescription("Part to Attach to display the Applicant testing App.")
       );

        await SchemaBuilder.CreateMapIndexTableAsync<ApplicantTestIndex>(table => table
          .Column<string>("ContentItemId", column => column.WithLength(26))
          .Column<string>("UserName", column => column.WithLength(26))
          .Column<DateTime>("TestTakenAt", column => column.NotNull())
          .Column<int>("Email")
          .Column<int>("BookMarkClicked")
          .Column<int>("formSubmitted")
          .Column<int>("MessageSentToAsakoSatoshi")
          .Column<int>("MessageSentToLilyWang")
          .Column<int>("MessageSentToMadisonByers")
          .Column<int>("MessageSentToDominicGonzalez")
          .Column<int>("MessageSentToSimoneKhan")
        );
        return 2;
    }
}
