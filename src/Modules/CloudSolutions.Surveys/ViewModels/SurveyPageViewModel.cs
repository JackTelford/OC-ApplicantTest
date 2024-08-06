using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using OrchardCore.ContentManagement;

namespace CloudSolutions.Surveys.ViewModels;


public class SurveyPageViewModel
{
    [Required]
    public string InterviewId { get; set; }

    [BindNever]
    public string Title { get; set; }

    [BindNever]
    public string Description { get; set; }

    [BindNever]
    public IList<ContentItem> Questions { get; set; }


    [Required]
    public NavigationDirection? Direction { get; set; }

    [Required]
    public Dictionary<string, string[]> Answers { get; set; }
}
