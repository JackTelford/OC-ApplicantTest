using CloudSolutions.Surveys.Core;
using CloudSolutions.Surveys.Core.Models.Reports;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using OrchardCore.ContentManagement;
using OrchardCore.ContentManagement.Records;
using YesSql;

namespace CloudSolutions.Surveys.Controllers;


[Authorize]
public sealed class ReportStructuresController : Controller
{
    private readonly IInterviewDataPresenter _interviewDataPresenter;
    private readonly ISession _session;
    public ReportStructuresController(IInterviewDataPresenter interviewDataPresenter, ISession session)
    {
        _interviewDataPresenter = interviewDataPresenter;
        _session = session;
    }



    [Produces("application/json")]
    public async Task<IActionResult> Columns(string surveyVersionId)
    {
        if (string.IsNullOrEmpty(surveyVersionId))
        {
            return BadRequest();
        }

        var survey = await _session.Query<ContentItem, ContentItemIndex>(x => x.ContentItemVersionId == surveyVersionId && x.ContentType == SurveyConstants.SurveyContentType).FirstOrDefaultAsync();

        if (survey == null)
        {
            return NotFound();
        }

        IEnumerable<ReportColumn> columns = await _interviewDataPresenter.GetReportColumnsAsync(survey);

        return Ok(columns.OrderBy(x => x.Title));
    }

}
