using System.ComponentModel.DataAnnotations;
using CloudSolutions.Surveys.ViewModels;

namespace CloudSolutions.Surveys.DesktopSimulator.ViewModels;

public class DesktopSimulatorPartViewModel : SurveyControlInterviewViewModel
{
    [Required(AllowEmptyStrings = false)]
    public string Events { get; set; }
}
