import { intervalToDuration } from 'date-fns';

export function formatDuration(milliseconds: number): string {
  const duration = intervalToDuration({ start: 0, end: milliseconds });
  const parts = [
    String(duration.hours || 0).padStart(2, '0'),
    String(duration.minutes || 0).padStart(2, '0'),
    String(duration.seconds || 0).padStart(2, '0'),
  ];
  const ms = String(Math.floor((milliseconds % 1000) / 100));

  return `${parts.join(':')}:${ms}`;
}
