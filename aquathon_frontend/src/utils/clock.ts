import { intervalToDuration } from 'date-fns';

export function formatDuration(milliseconds: number, minuteOnly?:boolean): string {
    const duration = intervalToDuration({ start: 0, end: milliseconds });
    const parts = [
        String(duration.hours || 0).padStart(2, '0'),
        String(duration.minutes || 0).padStart(2, '0'),
        String(duration.seconds || 0).padStart(2, '0'),
    ];
    const ms = String(Math.floor((milliseconds % 1000) / 100));
    if ( minuteOnly ) {
        return `${parts.slice(1,3).join(':')},${ms}`;
    }
    return `${parts.join(':')},${ms}`;
}
