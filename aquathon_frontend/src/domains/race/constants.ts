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

export const STATUS_COLORS: Record<Race['status'], string> = {
  finished: 'blue-500',
  ongoing: 'green-500',
  upcoming: 'orange-500',
};
