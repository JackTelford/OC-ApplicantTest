using CloudSolutions.Surveys.Core.Models;

namespace CloudSolutions.Surveys.DesktopSimulator.Models;

public class DesktopSimulatorPartMetadata : SurveyControlPartMetadata
{
    public bool EmailSent { get; set; }
    public double EmailSentWeight { get; set; }

    public bool MessageSentToAsakoSatoshi { get; set; }
    public double MessageSentToAsakoSatoshiWeight { get; set; }

    public bool MessageSentToLilyWang { get; set; }
    public double MessageSentToLilyWangWeight { get; set; }

    public bool MessageSentToMadisonByers { get; set; }
    public double MessageSentToMadisonByersWeight { get; set; }

    public bool MessageSentToDominicGonzalez { get; set; }
    public double MessageSentToDominicGonzalezWeight { get; set; }

    public bool MessageSentToSimoneKhan { get; set; }
    public double MessageSentToSimoneKhanWeight { get; set; }

    public bool BookmarkClicked { get; set; }
    public double BookmarkClickedWeight { get; set; }

    public bool FormSubmitted { get; set; }
    public double FormSubmittedWeight { get; set; }

    public string Format { get; set; }

    public bool ShouldCalulateScore()
        => EmailSent ||
            BookmarkClicked ||
            FormSubmitted ||
            MessageSentToAsakoSatoshi ||
            MessageSentToMadisonByers ||
            MessageSentToDominicGonzalez ||
            MessageSentToSimoneKhan ||
            MessageSentToLilyWang;
}
