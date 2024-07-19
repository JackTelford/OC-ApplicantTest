using ApplicantTest.Handlers;
using ApplicantTest.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Localization;
using OrchardCore.ContentManagement;
using OrchardCore.ContentManagement.Display.ContentDisplay;
using OrchardCore.ContentManagement.Display.Models;
using OrchardCore.DisplayManagement.ModelBinding;
using OrchardCore.DisplayManagement.Views;
using System.Threading.Tasks;

namespace ApplicantTest.Drivers;

public class ApplicantTestDisplayDriver : ContentPartDisplayDriver<ApplicantTestPart>
{
    internal readonly IStringLocalizer S;

    public ApplicantTestDisplayDriver(
        IStringLocalizer<ApplicantTestDisplayDriver> stringLocalizer)
    {
        S = stringLocalizer;
    }

    public override IDisplayResult Display(ApplicantTestPart part, BuildPartDisplayContext context)
    {
        return Initialize<ApplicantTestPart>("ApplicantTestPart", m =>
        {
            m.ApplicantTest = part.ApplicantTest;
            m.BookMarkClicked = part.BookMarkClicked;
            m.formSubmitted = part.formSubmitted;
            m.TestTakenAt = part.TestTakenAt;
            m.UserName = part.UserName;
            m.Email = part.Email;
            m.MessageSentToAsakoSatoshi = part.MessageSentToAsakoSatoshi;
            m.MessageSentToLilyWang = part.MessageSentToLilyWang;
            m.MessageSentToMadisonByers = part.MessageSentToMadisonByers;
            m.MessageSentToDominicGonzalez = part.MessageSentToDominicGonzalez;
            m.MessageSentToSimoneKhan = part.MessageSentToSimoneKhan;
        })
        .Location("Detail", "Content:10")
        .Location("Summary", "Content:10");
    }

    public override IDisplayResult Edit(ApplicantTestPart part, BuildPartEditorContext context)
    {
        return Initialize<ApplicantTestPart>("ApplicantTestPart_Edit", m =>
        {
            m.ApplicantTest = part.ApplicantTest;
            m.BookMarkClicked = part.BookMarkClicked;
            m.formSubmitted = part.formSubmitted;
            m.TestTakenAt = part.TestTakenAt;
            m.UserName = part.UserName;
            m.Email = part.Email;
            m.MessageSentToAsakoSatoshi = part.MessageSentToAsakoSatoshi;
            m.MessageSentToLilyWang = part.MessageSentToLilyWang;
            m.MessageSentToMadisonByers = part.MessageSentToMadisonByers;
            m.MessageSentToDominicGonzalez = part.MessageSentToDominicGonzalez;
            m.MessageSentToSimoneKhan = part.MessageSentToSimoneKhan;
        });
    }

    public override async Task<IDisplayResult> UpdateAsync(ApplicantTestPart part, IUpdateModel updater, UpdatePartEditorContext context)
    {
        if (await updater.TryUpdateModelAsync(part, Prefix))
        {
            Console.WriteLine($"Updating part: {part.ContentItemId}");
            Console.WriteLine($"Submitted Data: Email: {part.Email}, BookmarkClicked: {part.BookMarkClicked}, FormSubmitted: {part.formSubmitted}, UserName: {part.UserName}");
            // Update fields on conditions
            part.BookMarkClicked = part.BookMarkClicked > 0 ? 1 : 0;
            part.Email = part.Email > 0 ? 1 : 0;
            part.formSubmitted = part.formSubmitted > 0 ? 1 : 0;
            /* part.TestTakenAt ??= DateTime.UtcNow;*/
            part.UserName ??= "Anonymous";
            /*  part.ApplicantTest ??= "No Test Taken";*/
            part.MessageSentToAsakoSatoshi = part.MessageSentToAsakoSatoshi > 0 ? 1 : 0;
            part.MessageSentToLilyWang = part.MessageSentToLilyWang > 0 ? 1 : 0;
            part.MessageSentToMadisonByers = part.MessageSentToMadisonByers > 0 ? 1 : 0;
            part.MessageSentToDominicGonzalez = part.MessageSentToDominicGonzalez > 0 ? 1 : 0;
            part.MessageSentToSimoneKhan = part.MessageSentToSimoneKhan > 0 ? 1 : 0;

            Console.WriteLine($"Part updated: {part.ContentItemId}");
        }
        else
        {
            Console.WriteLine($"Failed to update part: {part.ContentItemId}");
            foreach (var error in updater.ModelState.Values.SelectMany(v => v.Errors))
            {
                Console.WriteLine($"Validation error: {error.ErrorMessage}");
            }
        }
        return Edit(part, context);
    }
}

