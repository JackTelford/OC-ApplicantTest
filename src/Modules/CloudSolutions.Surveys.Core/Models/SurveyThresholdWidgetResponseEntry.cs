using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using OrchardCore.ContentManagement;

namespace CloudSolutions.Surveys.Models;

public sealed class SurveyThresholdWidgetResponseEntry : ContentPart
{
    public string UserDisplayName { get; set; }

    public string Title { get; set; }

    public double Response { get; set; }

    public DateTime InterviewedAtLocal { get; set; }
}
