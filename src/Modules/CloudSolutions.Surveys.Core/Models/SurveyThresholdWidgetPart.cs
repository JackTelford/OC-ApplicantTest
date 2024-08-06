using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc.Rendering;
using OrchardCore.ContentManagement;

namespace CloudSolutions.Surveys.Models;

public sealed class SurveyThresholdWidgetPart : ContentPart
{
    public int TotalDaysToView { get; set; }

    public int TotalMinutesToCache { get; set; }

    public string SurveyContentItemId { get; set; }
}
