using ApplicantTest.Models;
using ApplicantTest.ViewModels;
using Microsoft.Extensions.Localization;
using OrchardCore.ContentManagement.Display.ContentDisplay;
using OrchardCore.ContentManagement.Display.Models;
using OrchardCore.DisplayManagement.ModelBinding;
using OrchardCore.DisplayManagement.Views;

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
            m.BookmarkClicked = part.BookmarkClicked;
            m.FormSubmitted = part.FormSubmitted;
            m.EmailSent = part.EmailSent;
            m.MessageSentToAsakoSatoshi = part.MessageSentToAsakoSatoshi;
            m.MessageSentToLilyWang = part.MessageSentToLilyWang;
            m.MessageSentToMadisonByers = part.MessageSentToMadisonByers;
            m.MessageSentToDominicGonzalez = part.MessageSentToDominicGonzalez;
            m.MessageSentToSimoneKhan = part.MessageSentToSimoneKhan;
            m.Score = part.Score;
        })
        .Location("Detail", "Content:10")
        .Location("Summary", "Content:10");
    }

    public override IDisplayResult Edit(ApplicantTestPart part, BuildPartEditorContext context)
    {
        return Initialize<ApplicantTestPart>("ApplicantTestPart_Edit", m =>
        {
            m.BookmarkClicked = part.BookmarkClicked;
            m.FormSubmitted = part.FormSubmitted;
            m.EmailSent = part.EmailSent;
            m.MessageSentToAsakoSatoshi = part.MessageSentToAsakoSatoshi;
            m.MessageSentToLilyWang = part.MessageSentToLilyWang;
            m.MessageSentToMadisonByers = part.MessageSentToMadisonByers;
            m.MessageSentToDominicGonzalez = part.MessageSentToDominicGonzalez;
            m.MessageSentToSimoneKhan = part.MessageSentToSimoneKhan;
        });
    }

    public override async Task<IDisplayResult> UpdateAsync(ApplicantTestPart part, IUpdateModel updater, UpdatePartEditorContext context)
    {
        var vm = new ApplicantTestPartViewModel();
        await updater.TryUpdateModelAsync(vm, Prefix);

        part.Score = 0;
        part.EmailSent = vm.EmailSent;
        part.BookmarkClicked = vm.BookmarkClicked;
        part.FormSubmitted = vm.FormSubmitted;
        part.MessageSentToAsakoSatoshi = vm.MessageSentToAsakoSatoshi;
        part.MessageSentToLilyWang = vm.MessageSentToLilyWang;
        part.MessageSentToMadisonByers = vm.MessageSentToMadisonByers;
        part.MessageSentToDominicGonzalez = vm.MessageSentToDominicGonzalez;
        part.MessageSentToSimoneKhan = vm.MessageSentToSimoneKhan;

        if (part.EmailSent)
        {
            part.Score += 10;
        }
        if (part.BookmarkClicked)
        {
            part.Score += 10;
        }
        if (part.FormSubmitted)
        {
            part.Score += 10;
        }
        if (part.MessageSentToAsakoSatoshi)
        {
            part.Score += 10;
        }
        if (part.MessageSentToLilyWang)
        {
            part.Score += 10;
        }
        if (part.MessageSentToMadisonByers)
        {
            part.Score += 10;
        }
        if (part.MessageSentToDominicGonzalez)
        {
            part.Score += 10;
        }
        if (part.MessageSentToSimoneKhan)
        {
            part.Score += 10;
        }

        return Edit(part, context);
    }
}

