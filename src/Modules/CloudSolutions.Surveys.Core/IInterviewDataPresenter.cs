using CloudSolutions.Surveys.Core.Models.Reports;
using OrchardCore.ContentManagement;

namespace CloudSolutions.Surveys.Core;

public interface IInterviewDataPresenter
{
    Task<IList<ReportColumn>> GetReportColumnsAsync(ContentItem survey);

    Task<ReportTable> GetTableAsync(ContentItem survey, IEnumerable<ContentItem> interviews);
}
