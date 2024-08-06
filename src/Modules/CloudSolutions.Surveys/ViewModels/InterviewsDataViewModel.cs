using CloudSolutions.Reporting.ViewModels;
using CloudSolutions.Surveys.Core;
using CloudSolutions.Surveys.Core.Models;
using CloudSolutions.Surveys.Core.Models.Reports;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using OfficeOpenXml;
using OrchardCore.ContentManagement;
using OrchardCore.Users.Models;

namespace CloudSolutions.Surveys.ViewModels;

public class InterviewsDataViewModel : ContentItemFiltersViewModel
{
    [BindNever]
    public ContentItem Survey { get; set; }

    [BindNever]
    public List<ReportColumn> Columns { get; private set; } = [];

    [BindNever]
    public IList<InterviewRecord> Interviews { get; set; }

    [BindNever]
    public Dictionary<string, User> Users { get; set; }

    [BindNever]
    public Dictionary<string, ContentItem> Teams { get; set; }

    public bool IsValid()
        => Survey != null && Survey.ContentType == SurveyConstants.SurveyContentType && Conditions.Count > 0;

    [BindNever]
    public ExcelPackage Excel { get; set; }
}

public class InterviewsDataByTeamViewModel : InterviewsDataViewModel
{
    [BindNever]
    public Dictionary<string, List<InterviewRecord>> Rows { get; }

    public InterviewsDataByTeamViewModel()
    {
        Rows = [];
    }
}
