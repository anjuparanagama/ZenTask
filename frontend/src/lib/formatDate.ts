import { format } from "date-fns";

export function formatDueDate(dateString: string): string {
  const date = new Date(dateString);

  if (isNaN(date.getTime())) {
    return dateString;
  }

  return format(date, "dd MMMM yyyy, EEEE");
}
