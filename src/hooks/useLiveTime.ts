import { useState, useEffect } from 'react';

export interface LiveTimeInfo {
  timeStr: string;
  dateStr: string;
  fullStr: string;
  timeZoneLabel: string;
}

export function useLiveTime(timeZone?: string): LiveTimeInfo {
  const [now, setNow] = useState<Date>(() => new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setNow(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  try {
    const tz = timeZone && timeZone !== 'auto' ? timeZone : Intl.DateTimeFormat().resolvedOptions().timeZone;

    const timeFormatter = new Intl.DateTimeFormat('en-US', {
      timeZone: tz,
      hour: 'numeric',
      minute: '2-digit',
      second: '2-digit',
      hour12: true,
    });

    const dateFormatter = new Intl.DateTimeFormat('en-US', {
      timeZone: tz,
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    });

    const timeStr = timeFormatter.format(now);
    const dateStr = dateFormatter.format(now);
    const timeZoneLabel = tz.includes('/') ? tz.split('/')[1].replace(/_/g, ' ') : tz;

    return {
      timeStr,
      dateStr,
      fullStr: `${dateStr} • ${timeStr}`,
      timeZoneLabel,
    };
  } catch {
    // Fallback if timezone string is unsupported
    const timeStr = now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', second: '2-digit', hour12: true });
    const dateStr = now.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
    return {
      timeStr,
      dateStr,
      fullStr: `${dateStr} • ${timeStr}`,
      timeZoneLabel: 'Local Time',
    };
  }
}
