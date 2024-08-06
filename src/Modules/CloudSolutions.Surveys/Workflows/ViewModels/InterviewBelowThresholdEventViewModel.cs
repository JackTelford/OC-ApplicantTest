using CloudSolutions.Surveys.Workflows.Activities;
using OrchardCore.DisplayManagement.Views;

namespace CloudSolutions.Surveys.Workflows.ViewModels;

public class InterviewBelowThresholdEventViewModel : ShapeViewModel<InterviewBelowThresholdEvent>
{
    public InterviewBelowThresholdEventViewModel(InterviewBelowThresholdEvent activity)
        : base(activity)
    {
    }
}
