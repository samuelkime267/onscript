export default function formatScheduleDate(date: Date | string): string {
  const now = new Date();
  const target = new Date(date);

  const isSameDay = (d1: Date, d2: Date): boolean =>
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate();

  const isTomorrow = (d1: Date, d2: Date): boolean => {
    const tomorrow = new Date(d1);
    tomorrow.setDate(tomorrow.getDate() + 1);
    return isSameDay(tomorrow, d2);
  };

  const daysDiff = Math.floor(
    (target.getTime() - now.getTime()) / (1000 * 60 * 60 * 24),
  );

  const timeStr: string = target.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  });

  if (isSameDay(now, target)) {
    return `Today at ${timeStr}`;
  }
  if (isTomorrow(now, target)) {
    return `Tomorrow at ${timeStr}`;
  }
  if (daysDiff < 7 && daysDiff > 0) {
    return `Next ${target.toLocaleDateString("en-US", { weekday: "long" })} at ${timeStr}`;
  }
  return (
    target.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }) + ` at ${timeStr}`
  );
}
