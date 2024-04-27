export function formatPastTime(time: string): string {
  const today = new Date();
  const date = new Date(time);

  const todayTimestamp = today.getTime();
  const dateTimestamp = date.getTime();

  const diffTime = Math.abs(todayTimestamp - dateTimestamp);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 0) {
    return date.toLocaleString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
  } else if (diffDays === 1) {
    return "Yesterday";
  } else if (diffDays < 7) {
    return date.toLocaleDateString("en-US", { weekday: "short" });
  } else {
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  }
}
