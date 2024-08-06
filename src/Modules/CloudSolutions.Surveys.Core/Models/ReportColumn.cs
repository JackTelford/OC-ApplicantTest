using OrchardCore.ContentManagement;

namespace CloudSolutions.Surveys.Core.Models.Reports;

public sealed class ReportTable
{
    public IList<ReportColumn> Columns { get; private set; }

    public IList<ReportRow> Rows { get; private set; }

    public ReportTable(IList<ReportColumn> columns)
    {
        Columns = columns ?? [];
        Rows = [];
    }
}

public sealed class ReportColumn : ContentPart
{
    public string Id { get; }

    public string QuestionId { get; }

    public string InputId { get; }

    public string QuestionTitle { get; }

    public string InputTitle { get; }

    public ContentItem Input { get; }

    public ContentItem Question { get; }

    public ContentItem Page { get; }

    public bool Aggregable { get; }

    public string Title
    {
        get
        {
            if (!string.IsNullOrWhiteSpace(InputTitle))
            {
                return InputTitle;
            }

            return QuestionTitle;
        }
    }

    public ReportColumn()
    {
        Id = Guid.NewGuid().ToString();
    }

    public ReportColumn(ContentItem input, ContentItem question, ContentItem page, bool aggregable)
        : this()
    {
        ArgumentNullException.ThrowIfNull(input);
        ArgumentNullException.ThrowIfNull(question);

        QuestionId = question.ContentItemId;
        QuestionTitle = question.DisplayText;
        InputId = input.ContentItemId;
        InputTitle = input.DisplayText;
        Input = input;
        Question = question;
        Page = page;
        Aggregable = aggregable;
    }
}

public sealed class ReportRow
{
    public string InterviewId { get; set; }

    public DateTime InterviewedAtUtc { get; set; }

    public string InterviewedBy { get; set; }
    public string InterviewedByFullName { get; set; }

    public IList<ReportCell> Cells { get; private set; }
    public DateTimeOffset InterviewAtLocal { get; internal set; }

    public ReportRow()
    {
        Cells = [];
    }
}

public sealed class ReportCell
{
    public string InputId { get; set; }

    public string Value { get; set; }

    public double? Average { get; set; }

    public double? Sum { get; set; }

    public ContentItem Input { get; internal set; }

    public ReportCell()
    {

    }

    public ReportCell(ContentItem input)
    {
        Input = input;
        InputId = input?.ContentItemId;
    }
}
