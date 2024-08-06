using CloudSolutions.Surveys.Workflows.Activities;
using CloudSolutions.Surveys.Workflows.ViewModels;
using OrchardCore.DisplayManagement.Views;
using OrchardCore.Workflows.Display;

namespace CloudSolutions.Surveys.Workflows.DisplayDriver;

public sealed class InterviewBelowThresholdEventDisplayDriver : ActivityDisplayDriver<InterviewBelowThresholdEvent>
{
    public override IDisplayResult Display(InterviewBelowThresholdEvent activity)
    {
        return Combine(
            Shape("InterviewBelowThresholdEvent_Fields_Thumbnail", new InterviewBelowThresholdEventViewModel(activity)).Location("Thumbnail", "Content"),
            Factory("InterviewBelowThresholdEvent_Fields_Design", ctx => new InterviewBelowThresholdEventViewModel(activity)).Location("Design", "Content")
        );
    }
}
