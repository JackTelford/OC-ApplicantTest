using ApplicantTest.Drivers;
using ApplicantTest.Handlers;
using ApplicantTest.Indexes;
using ApplicantTest.Middlewear;
using ApplicantTest.Migrations;
using ApplicantTest.Models;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;
using OrchardCore.ContentManagement;
using OrchardCore.ContentManagement.Display.ContentDisplay;
using OrchardCore.ContentManagement.Handlers;
using OrchardCore.Data;
using OrchardCore.Data.Migration;

namespace ApplicantTest;
public class Startup : OrchardCore.Modules.StartupBase
{
    public override void ConfigureServices(IServiceCollection services)
    {
        services.AddContentPart<ApplicantTestPart>()
                    .UseDisplayDriver<ApplicantTestDisplayDriver>();

        services.AddScoped<IDataMigration, ApplicantTestMigrations>();
        services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();
        services.AddScoped<Lazy<IContentManager>>(sp => new Lazy<IContentManager>(() => sp.GetRequiredService<IContentManager>()));
        services.AddScoped<IContentHandler, ApplicantTestContentHandler>();
        services.AddControllersWithViews();
    }

    public static void Configure(IApplicationBuilder app, IWebHostEnvironment env)
    {
        app.UseCustomStaticFiles(env);

        /*app.UseApplicantTestMiddleware();*/

        app.UseEndpoints(endpoints =>
        {
            endpoints.MapControllerRoute(
                name: "default",
                pattern: "{controller=ApplicantTest}/{action=Index}/{id?}");
            endpoints.MapControllers();
        });
    }
}
