import { Flag, RefreshCw, Timer } from 'lucide-react';

import { Race } from './interface';

export const STATUS_ICONS: Record<Race['status'], typeof Flag> = {
  Finished: Flag,
  Ongoing: RefreshCw,
  Pending: Timer,
};

export const STATUS_COLORS: Record<Race['status'], string> = {
  Finished: 'text-green-500',
  Ongoing: 'text-orange-500',
  Pending: 'text-gray-500',
};
