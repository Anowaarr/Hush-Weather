/**
 * Utilities for parsing and formatting weather dates.
 * Open-Meteo returns ISO strings in the location's local time (e.g. "2026-11-08T14:00").
 * We parse these components directly to preserve the location's wall-clock time accurately.
 */

export interface ParsedLocalDateTime {
  year: number;
  month: number; // 1-12
  day: number; // 1-31
  hour: number; // 0-23
  minute: number; // 0-59
  raw: string;
}

export function parseLocalIso(isoString: string): ParsedLocalDateTime {
  // Format: "YYYY-MM-DDTHH:mm" or "YYYY-MM-DD"
  const [datePart, timePart] = isoString.split('T');
  const [y, m, d] = datePart.split('-').map(Number);
  let h = 0;
  let min = 0;

  if (timePart) {
    const [hh, mm] = timePart.split(':').map(Number);
    h = hh ?? 0;
    min = mm ?? 0;
  }

  return {
    year: y,
    month: m,
    day: d,
    hour: h,
    minute: min,
    raw: isoString,
  };
}

const DAYS_SHORT = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export function formatDayLabel(dateString: string, index: number): string {
  if (index === 0) {
    return 'Today';
  }
  const { year, month, day } = parseLocalIso(dateString);
  // Construct date in UTC to get stable day of week
  const d = new Date(Date.UTC(year, month - 1, day));
  return DAYS_SHORT[d.getUTCDay()];
}

export function formatHourLabel(isoString: string, isNow = false): string {
  if (isNow) {
    return 'Now';
  }
  const { hour } = parseLocalIso(isoString);
  const period = hour >= 12 ? 'PM' : 'AM';
  const displayHour = hour % 12 === 0 ? 12 : hour % 12;
  return `${displayHour} ${period}`;
}

export function formatSunTime(isoString: string): string {
  const { hour, minute } = parseLocalIso(isoString);
  const period = hour >= 12 ? 'PM' : 'AM';
  const displayHour = hour % 12 === 0 ? 12 : hour % 12;
  const displayMinute = minute.toString().padStart(2, '0');
  return `${displayHour}:${displayMinute} ${period}`;
}

/**
 * Calculates sun progress between sunrise and sunset (0 = sunrise or before, 1 = sunset or after).
 */
export function calculateSunPosition(
  currentIso: string,
  sunriseIso: string,
  sunsetIso: string
): { progress: number; isDaylight: boolean } {
  const cur = parseLocalIso(currentIso);
  const rise = parseLocalIso(sunriseIso);
  const set = parseLocalIso(sunsetIso);

  const curMinutes = cur.hour * 60 + cur.minute;
  const riseMinutes = rise.hour * 60 + rise.minute;
  const setMinutes = set.hour * 60 + set.minute;

  if (curMinutes <= riseMinutes) {
    return { progress: 0, isDaylight: false };
  }
  if (curMinutes >= setMinutes) {
    return { progress: 1, isDaylight: false };
  }

  const duration = setMinutes - riseMinutes;
  const elapsed = curMinutes - riseMinutes;
  const progress = duration > 0 ? Math.min(1, Math.max(0, elapsed / duration)) : 0.5;

  return { progress, isDaylight: true };
}
