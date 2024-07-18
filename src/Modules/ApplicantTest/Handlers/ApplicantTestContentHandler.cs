using ApplicantTest.Models;
using OrchardCore.ContentManagement;
using OrchardCore.ContentManagement.Handlers;
using System;
using System.Threading.Tasks;

namespace ApplicantTest.Handlers;

public class ApplicantTestContentHandler : ContentHandlerBase
{
    private readonly Lazy<IContentManager> _contentManager;

    public ApplicantTestContentHandler(Lazy<IContentManager> contentManager)
    {
        _contentManager = contentManager;
    }

    public override async Task UpdatedAsync(UpdateContentContext context)
    {
        if (context.ContentItem.ContentType == "ApplicantTest")
        {
            var part = context.ContentItem.As<ApplicantTestPart>();
            if (part != null)
            {
                // handle the finish test event
                if (part.formSubmitted == 1) // FormSubmitted indicates the test is finished
                {
                    var contentItem = await _contentManager.Value.NewAsync("ApplicantTest");
                    contentItem.Alter<ApplicantTestPart>(p =>
                    {
                        p.UserName = part.UserName;
                        p.Email = part.Email;
                        p.BookMarkClicked = part.BookMarkClicked;
                        p.formSubmitted = part.formSubmitted;
                        p.MessageSentToAsakoSatoshi = part.MessageSentToAsakoSatoshi;
                        p.MessageSentToLilyWang = part.MessageSentToLilyWang;
                        p.MessageSentToMadisonByers = part.MessageSentToMadisonByers;
                        p.MessageSentToDominicGonzalez = part.MessageSentToDominicGonzalez;
                        p.MessageSentToSimoneKhan = part.MessageSentToSimoneKhan;
                        p.TestTakenAt = DateTime.UtcNow;
                    });

                    await _contentManager.Value.CreateAsync(contentItem, VersionOptions.Published);
                }
            }
        }
    }
}
