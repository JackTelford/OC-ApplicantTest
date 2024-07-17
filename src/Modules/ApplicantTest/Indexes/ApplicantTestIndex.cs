using ApplicantTest.Models;
using OrchardCore.ContentManagement;
using YesSql.Indexes;

namespace ApplicantTest.Indexes;
public class ApplicantTestIndex : MapIndex
{
    public string ContentItemId { get; set; }

    public string UserName { get; set; }

    public DateTime TestTakenAt { get; set; }

    public int Email { get; set; }

    public int BookMarkClicked { get; set; }

    public int formSubmitted { get; set; }

    public int MessageSentToAsakoSatoshi { get; set; }

    public int MessageSentToLilyWang { get; set; }

    public int MessageSentToMadisonByers { get; set; }

    public int MessageSentToDominicGonzalez { get; set; }

    public int MessageSentToSimoneKhan { get; set; }
}

public class ApplicantTestIndexProvider : IndexProvider<ContentItem>
{
    public override void Describe(DescribeContext<ContentItem> context)
    {
        context.For<ApplicantTestIndex>()
            .Map(contentItem =>
            {
                var applicantTestPart = contentItem.As<ApplicantTestPart>();
                if (applicantTestPart is null)
                {
                    return null;
                }
                return new ApplicantTestIndex
                {
                    ContentItemId = contentItem.ContentItemId,
                    Email = applicantTestPart.Email,
                    TestTakenAt = applicantTestPart.TestTakenAt,
                    UserName = applicantTestPart.UserName,
                    BookMarkClicked = applicantTestPart.BookMarkClicked,
                    formSubmitted = applicantTestPart.formSubmitted,
                    MessageSentToAsakoSatoshi = applicantTestPart.MessageSentToAsakoSatoshi,
                    MessageSentToLilyWang = applicantTestPart.MessageSentToLilyWang,
                    MessageSentToMadisonByers = applicantTestPart.MessageSentToMadisonByers,
                    MessageSentToDominicGonzalez = applicantTestPart.MessageSentToDominicGonzalez,
                    MessageSentToSimoneKhan = applicantTestPart.MessageSentToSimoneKhan
                };
            });
    }
}
