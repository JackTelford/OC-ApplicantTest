using ApplicantTest.Drivers;
using ApplicantTest.Migrations;
using ApplicantTest.Models;
using Microsoft.Extensions.DependencyInjection;
using OrchardCore.ContentManagement;
using OrchardCore.ContentManagement.Display.ContentDisplay;
using OrchardCore.Data.Migration;
using OrchardCore.Modules;

namespace ApplicantTest;
public class Startup : StartupBase
{
    public override void ConfigureServices(IServiceCollection services)
    {
        services.AddContentPart<ApplicantTestPart>()
                    .UseDisplayDriver<ApplicantTestDisplayDriver>();
        services.AddDataMigration<ApplicantTestMigrations>();
    }
}

