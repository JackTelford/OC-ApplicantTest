using System.ComponentModel.DataAnnotations;

namespace CloudSolutions.Surveys.ViewModels;

public class SurveyVersionMenuViewModel
{
    [Required]
    public string VersionId { get; set; }
}

public class IntervieweeMenuViewModel
{
    public string UserId { get; set; }
}
