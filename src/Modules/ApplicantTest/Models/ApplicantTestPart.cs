using OrchardCore.ContentManagement;

namespace ApplicantTest.Models;
public class ApplicantTestPart : ContentPart
{
    public string ApplicantTest { get; set; }

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
