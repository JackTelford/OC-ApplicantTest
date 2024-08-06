using Microsoft.Extensions.Localization;
using OrchardCore.Workflows.Abstractions.Models;
using OrchardCore.Workflows.Activities;
using OrchardCore.Workflows.Models;

namespace CloudSolutions.Surveys.Workflows.Activities;

public sealed class InterviewBelowThresholdEvent : EventActivity
{
    internal readonly IStringLocalizer S;

    public override string Name => nameof(InterviewBelowThresholdEvent);

    public override LocalizedString DisplayText => S["Interview Below Threshold"];

    public override LocalizedString Category => S["Interview"];

    public InterviewBelowThresholdEvent(
        IStringLocalizer<InterviewBelowThresholdEvent> stringLocalizer)
    {
        S = stringLocalizer;
    }

    public override IEnumerable<Outcome> GetPossibleOutcomes(WorkflowExecutionContext workflowContext, ActivityContext activityContext)
    {
        return Outcomes(S["Done"]);
    }

    public override ActivityExecutionResult Resume(WorkflowExecutionContext workflowContext, ActivityContext activityContext)
    {
        return Outcomes("Done");
    }
}
