using System.ComponentModel.DataAnnotations;

namespace CloudSolutions.Surveys.ViewModels;

public class InterviewPageResponseViewModel
{
    [Required]
    public Dictionary<string, string[]> Answers { get; set; }
}
