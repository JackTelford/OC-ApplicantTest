using ApplicantTest.Drivers;
using ApplicantTest.Indexes;
using ApplicantTest.Middlewear;
using ApplicantTest.Migrations;
using ApplicantTest.Models;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.DependencyInjection;
using OrchardCore.ContentManagement;
using OrchardCore.ContentManagement.Display.ContentDisplay;
using OrchardCore.Data;
using OrchardCore.Data.Migration;

namespace ApplicantTest;
public class Startup : OrchardCore.Modules.StartupBase
{
    public override void ConfigureServices(IServiceCollection services)
    {
        services.AddContentPart<ApplicantTestPart>()
            .UseDisplayDriver<ApplicantTestDisplayDriver>();
        services.AddIndexProvider<ApplicantTestIndexProvider>();
        services.AddScoped<IDataMigration, ApplicantTestMigrations>();
    }

    public static void Configure(IApplicationBuilder app, IWebHostEnvironment env)
    {
        app.UseCustomStaticFiles(env);
    }
}
