using CloudSolutions.Surveys.Core.Models;

namespace CloudSolutions.Surveys.ViewModels;

public class SurveyQuestionViewModel
{
    public string Title { get; set; }

    public string Description { get; set; }

    public IList<SurveyInput> Inputs { get; set; }
}
