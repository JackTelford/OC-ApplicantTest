using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Mvc;

namespace CloudSolutions.Surveys.ViewModels;

public class SaveInterviewViewModel
{
    [Required, FromRoute]
    public string InterviewId { get; set; }

    [Required, FromForm]
    public NavigationDirection? Direction { get; set; }
}
