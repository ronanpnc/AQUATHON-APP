import { ISegment, Race } from './interface';

export const STATUS_ICONS: Record<Race['status'], { text: string; icon: string }> = {
  finished: {
    text: 'Finished',
    icon: '/assets/icons/ic_finished.svg',
  },
  ongoing: {
    text: 'Ongoing',
    icon: '/assets/icons/ic_running.svg',
  },
  upcoming: {
    text: 'Upcoming',
    icon: '/assets/icons/ic_not_started.svg',
  },
};

export const STATUS_COLORS: Record<Race['status'], { bg: string; text: string }> = {
  ongoing: { bg: 'bg-green-500', text: 'text-green-500' },
  upcoming: { bg: 'bg-orange-500', text: 'text-orange-500' },
  finished: { bg: 'bg-blue-500', text: 'text-blue-500' },
};

export const SEGMENT_TYPES: Record<ISegment['_id'], { text: string; icon: string }> = {
  running: {
    text: 'running',
    icon: '/assets/icons/ic_running.svg',
  },
  swimming: {
    text: 'swimming',
    icon: '/assets/icons/ic_swimming.svg',
  },
  biking: {
    text: 'biking',
    icon: '/assets/icons/ic_biking.svg',
  },
  transition: {
    text: 'transition',
    icon: '',
  },
};

export const SEGMENT_COLORS: Record<ISegment['_id'], { bg: string; text: string }> = {
  running: { bg: 'bg-green-500', text: 'text-green-500' },
  swimming: { bg: 'bg-blue-500', text: 'text-blue-500' },
  biking: { bg: 'bg-red-500', text: 'text-red-500' },
  transition: { bg: 'bg-gray-500', text: 'text-gray-500' },
};
