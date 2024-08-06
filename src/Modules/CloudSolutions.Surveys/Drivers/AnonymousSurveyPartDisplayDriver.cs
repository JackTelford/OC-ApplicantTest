using CloudSolutions.Surveys.Core.Models;
using OrchardCore.ContentManagement.Display.ContentDisplay;
using OrchardCore.DisplayManagement.ModelBinding;
using OrchardCore.DisplayManagement.Views;

namespace CloudSolutions.Surveys.Drivers;

public class AnonymousSurveyPartDisplayDriver : ContentPartDisplayDriver<AnonymousSurveyPart>
{
    public override IDisplayResult Edit(AnonymousSurveyPart part)
    {
        return Initialize<AnonymousSurveyPart>("AnonymousSurvey_Edit", model =>
        {
            model.AllowAnonymous = part.AllowAnonymous;
        });
    }

    public override async Task<IDisplayResult> UpdateAsync(AnonymousSurveyPart part, IUpdateModel updater)
    {
        var model = new AnonymousSurveyPart();

        await updater.TryUpdateModelAsync(model, Prefix);

        part.AllowAnonymous = model.AllowAnonymous;

        return Edit(part);
    }
}
