using CloudSolutions.Surveys.DesktopSimulator.Drivers;
using CloudSolutions.Surveys.DesktopSimulator.Migrations;
using CloudSolutions.Surveys.DesktopSimulator.Models;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Routing;
using Microsoft.Extensions.DependencyInjection;
using OrchardCore.ContentManagement;
using OrchardCore.Data.Migration;
using OrchardCore.Modules;

namespace CloudSolutions.Surveys.DesktopSimulator;
public class Startup : StartupBase
{
    public override void ConfigureServices(IServiceCollection services)
    {
        services.AddContentPart<DesktopSimulatorPart>()
            .UseDisplayDriver<DesktopSimulatorDisplayDriver>();

        services.AddDataMigration<DesktopSimulatorMigrations>();
    }
}
