using CloudSolutions.Surveys.Models;
using CloudSolutions.Surveys.ViewModels;
using OrchardCore.ContentManagement;

namespace CloudSolutions.Surveys.Services;

public interface IInterviewManager
{
    Task<InterviewResult> CurrentAsync(ContentItem interview);

    Task<InterviewResult> CurrentAsync(string interviewId);

    Task<InterviewResult> StartAsync(ContentItem survey);
    Task<InterviewResult> StartAsync(string surveyId);

    Task<InterviewResult> TravelAsync(ContentItem interview, NavigationDirection value);

    Task<InterviewResult> TravelAsync(string interviewId, NavigationDirection value);

    Task<CanStartResult> CanStartAsync(ContentItem interview, string userId);
}

