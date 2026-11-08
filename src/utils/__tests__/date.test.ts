import { describe, it, expect } from 'vitest';
import {
  parseLocalIso,
  formatDayLabel,
  formatHourLabel,
  formatSunTime,
  calculateSunPosition,
} from '../date';

describe('Date and Time Utilities', () => {
  it('parses local ISO strings without timezone distortion', () => {
    const parsed = parseLocalIso('2026-11-08T18:45');
    expect(parsed.year).toBe(2026);
    expect(parsed.month).toBe(11);
    expect(parsed.day).toBe(8);
    expect(parsed.hour).toBe(18);
    expect(parsed.minute).toBe(45);
  });

  it('formats day label as "Today" for index 0 and 3-letter weekday otherwise', () => {
    expect(formatDayLabel('2026-11-08', 0)).toBe('Today');
    // 2026-11-09 is a Monday
    expect(formatDayLabel('2026-11-09', 1)).toBe('Mon');
  });

  it('formats hourly label with "Now" override', () => {
    expect(formatHourLabel('2026-11-08T14:00', true)).toBe('Now');
    expect(formatHourLabel('2026-11-08T14:00', false)).toBe('2 PM');
    expect(formatHourLabel('2026-11-08T00:00', false)).toBe('12 AM');
    expect(formatHourLabel('2026-11-08T11:00', false)).toBe('11 AM');
  });

  it('formats sunrise and sunset time with AM/PM', () => {
    expect(formatSunTime('2026-11-08T06:35')).toBe('6:35 AM');
    expect(formatSunTime('2026-11-08T17:08')).toBe('5:08 PM');
  });

  it('calculates sun position along day trajectory', () => {
    // Before sunrise
    const beforeRise = calculateSunPosition(
      '2026-11-08T05:00',
      '2026-11-08T06:00',
      '2026-11-08T18:00'
    );
    expect(beforeRise.progress).toBe(0);
    expect(beforeRise.isDaylight).toBe(false);

    // Midday (exact midpoint of 12-hour span from 06:00 to 18:00)
    const midday = calculateSunPosition(
      '2026-11-08T12:00',
      '2026-11-08T06:00',
      '2026-11-08T18:00'
    );
    expect(midday.progress).toBeCloseTo(0.5, 2);
    expect(midday.isDaylight).toBe(true);

    // After sunset
    const afterSet = calculateSunPosition(
      '2026-11-08T20:00',
      '2026-11-08T06:00',
      '2026-11-08T18:00'
    );
    expect(afterSet.progress).toBe(1);
    expect(afterSet.isDaylight).toBe(false);
  });
});
