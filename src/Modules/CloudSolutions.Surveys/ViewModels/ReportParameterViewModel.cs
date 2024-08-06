using System.ComponentModel.DataAnnotations;
using CloudSolutions.Surveys.Models;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using Microsoft.AspNetCore.Mvc.Rendering;

namespace CloudSolutions.Surveys.ViewModels;

public class ReportParameterViewModel
{
    [Required]
    public string Title { get; set; }

    public string Description { get; set; }

    [Required]
    public ReportType Type { get; set; }

    [Required]
    public ReportParameterTypes Range { get; set; }

    [Required]
    public string SurveyId { get; set; }

    public string TeamId { get; set; }

    public string IntervieweeId { get; set; }

    public bool ShowOnNavbar { get; set; }

    public string[] RoleNames { get; set; } = [];

    [BindNever]
    public IEnumerable<SelectListItem> DateRanges { get; set; }

    [BindNever]
    public IEnumerable<SelectListItem> Interviewees { get; set; }

    [BindNever]
    public IEnumerable<SelectListItem> Surveys { get; set; }

    [BindNever]
    public IEnumerable<SelectListItem> Teams { get; set; }

    [BindNever]
    public IEnumerable<SelectListItem> Types { get; set; }

    [BindNever]
    public IEnumerable<SelectListItem> Roles { get; set; }
}

public sealed class EditReportParameterViewModel : ReportParameterViewModel
{
    [Required]
    public string Id { get; set; }
}
