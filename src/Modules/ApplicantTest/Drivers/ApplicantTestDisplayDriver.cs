using ApplicantTest.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Localization;
using OrchardCore.ContentManagement;
using OrchardCore.ContentManagement.Display.ContentDisplay;
using OrchardCore.ContentManagement.Display.Models;
using OrchardCore.DisplayManagement.ModelBinding;
using OrchardCore.DisplayManagement.Views;
using System.Threading.Tasks;

namespace ApplicantTest.Drivers
{
    public class ApplicantTestDisplayDriver : ContentPartDisplayDriver<ApplicantTestPart>
    {
        internal readonly IStringLocalizer S;

        private readonly IHttpContextAccessor _httpContextAccessor;

        public ApplicantTestDisplayDriver(
            IStringLocalizer<ApplicantTestDisplayDriver> stringLocalizer,
            IHttpContextAccessor httpContextAccessor)
        {
            S = stringLocalizer;
            _httpContextAccessor = httpContextAccessor;
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
            await updater.TryUpdateModelAsync(part, Prefix);
            return Edit(part, context);
        }
    }
}
