using CloudSolutions.Surveys.ViewModels;
using OrchardCore.DisplayManagement;

namespace CloudSolutions.Surveys.Core;

public static class ShapeExtensions
{
    public static double? ReportAverage(this IShape shape)
    {
        var obj = shape as dynamic;

        if (obj != null && obj.Average != null && obj?.Average?.Items != null)
        {
            double? avg = null;
            var count = 0;

            foreach (var item in obj.Average.Items)
            {
                if (item.Value != null)
                {
                    avg ??= 0;
                    count++;
                    avg += (double)item.Value;
                }
            }

            if (count > 0)
            {
                return avg / count;
            }
        }

        return null;
    }

    public static double? ReportSum(this IShape shape)
    {
        var obj = shape as dynamic;

        if (obj != null && obj.Sum != null && obj.Sum.Items != null)
        {
            double? sum = null;

            foreach (var item in obj.Average.Items)
            {
                if (item.Value != null)
                {
                    sum ??= 0;

                    sum += (double)item.Value;
                }
            }

            return sum;
        }

        return null;
    }

    public static string ReportText(this IShape shape)
    {
        var obj = shape as dynamic;

        if (obj != null && obj.Content != null && obj.Content.Items != null)
        {
            var values = new List<string>();

            foreach (var item in obj.Content.Items)
            {

                if (item is TableCellViewModel vm && vm.Values != null)
                {
                    values.AddRange(vm.Values);
                }

            }

            var text = string.Join(" ", values);

            return text;
        }

        return null;
    }
}
