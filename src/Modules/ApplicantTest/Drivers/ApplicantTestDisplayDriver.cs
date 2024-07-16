using ApplicantTest.Models;
using Microsoft.Extensions.Localization;
using OrchardCore.ContentManagement.Display.ContentDisplay;
using OrchardCore.ContentManagement.Display.Models;
using OrchardCore.DisplayManagement.Views;

namespace ApplicantTest.Drivers;
public class ApplicantTestDisplayDriver : ContentPartDisplayDriver<ApplicantTestPart>
{
    internal readonly IStringLocalizer S;

    public ApplicantTestDisplayDriver(IStringLocalizer<ApplicantTestDisplayDriver> stringLocalizer)
    {
        S = stringLocalizer;
    }

    public override IDisplayResult Display(ApplicantTestPart part, BuildPartDisplayContext context)
    {
        return Initialize<ApplicantTestPart>("ApplicantTestPart", m => m.ApplicantTest = part.ApplicantTest)
            .Location("Detail", "Content:10")
            .Location("Summary", "Content:10");
    }

    public override IDisplayResult Edit(ApplicantTestPart part)
    {
        return Initialize<ApplicantTestPart>("ApplicantTestPart_Edit", model => { model.ApplicantTest = part.ApplicantTest; })
           .Location("Content");
    }
}


// path src/Modules/CloudSolutions.ApplicantTest.csproj/Drivers/ApplicantTestDisplayDriver.cs
