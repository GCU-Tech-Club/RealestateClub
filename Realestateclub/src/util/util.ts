export function formatDate(date: Date): string {
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
  } as Intl.DateTimeFormatOptions;
  return date.toLocaleDateString("en-US", options);
}

export function formatTime(date: Date): string {
  const options = {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  } as Intl.DateTimeFormatOptions;
  return date.toLocaleTimeString("en-US", options);
}
