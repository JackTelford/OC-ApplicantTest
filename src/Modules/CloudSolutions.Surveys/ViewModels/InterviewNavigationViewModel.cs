using System.ComponentModel.DataAnnotations;
using CloudSolutions.Surveys.Services;

namespace CloudSolutions.Surveys.ViewModels;

public class InterviewNavigationViewModel
{
    public bool CanGoBack { get; set; }

    public bool IsLastPage { get; set; }

    [Required]
    public NavigationDirection? Direction { get; set; }

    public InterviewNavigationViewModel()
    {

    }

    public InterviewNavigationViewModel(PageNavigation navigation)
    {
        ArgumentNullException.ThrowIfNull(navigation);

        CanGoBack = navigation.CanGoBack;
        IsLastPage = !navigation.HasNextPage;
    }
}
