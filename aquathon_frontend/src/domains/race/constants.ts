import { Race } from './interface';

export const STATUS_ICONS: Record<Race['status'], { text: string; icon: string }> = {
  finished: {
    text: 'Finished',
    icon: '/assets/icons/ic_finished.svg',
  },
  ongoing: {
    text: 'Ongoing',
    icon: '/assets/icons/ic_ongoing.svg',
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
