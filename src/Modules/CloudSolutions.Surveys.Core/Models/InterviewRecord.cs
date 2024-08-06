using System;
using System.Collections.Generic;
using OrchardCore.ContentManagement;

namespace CloudSolutions.Surveys.Core.Models;

public sealed class InterviewRecord
{
    public string InterviewId { get; set; }

    public List<string> TeamNames { get; set; } = [];

    public List<string> TeamIds { get; set; } = [];

    public string UserId { get; set; }

    public string FullName { get; set; }

    public DateTime? InterviewedAtLocal { get; set; }

    public DateTime? InterviewedAtUtc { get; set; }

    public ContentItem ContentItem { get; set; }
}
