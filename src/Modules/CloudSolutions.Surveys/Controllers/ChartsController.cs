using CloudSolutions.Charts.Models;
using CloudSolutions.Surveys.Core;
using CloudSolutions.Surveys.Core.Models;
using CloudSolutions.Surveys.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using OrchardCore.ContentManagement;
using OrchardCore.ContentManagement.Records;
using YesSql;

namespace CloudSolutions.Surveys.Controllers;

[Authorize]
public sealed class ChartsController : Controller
{
    private readonly ISession _session;
    private readonly InterviewDataProvider _interviewDataProvider;


    public ChartsController(ISession session, InterviewDataProvider interviewDataProvider)
    {
        _session = session;
        _interviewDataProvider = interviewDataProvider;
    }


    // this methid should be moved out of this controller
    [Produces("application/json")]
    public async Task<IActionResult> TeamOverview(string widgetId, string teamId)
    {
        if (string.IsNullOrEmpty(widgetId))
        {
            return BadRequest();
        }

        var widget = await _session.Query<ContentItem, ContentItemIndex>(x => x.ContentItemId == widgetId && x.Latest && x.ContentType == SurveyConstants.InterviewDataChart).FirstOrDefaultAsync();

        if (widget == null)
        {
            return NotFound();
        }

        var chartPart = widget.As<ChartInfoPart>();
        var part = widget.As<InterviewDataWithDefinedRangePart>();

        string[] teamIds = [];

        if (!string.IsNullOrEmpty(teamId))
        {
            teamIds = [teamId];
        }

        var vm = await _interviewDataProvider.GetAsync(part, chartPart, teamIds);

        if (vm == null)
        {
            return NoContent();
        }

        return Ok(vm);
    }
}
