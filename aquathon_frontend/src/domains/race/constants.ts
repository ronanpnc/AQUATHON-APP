import { Flag, LucideIcon, RefreshCw, Timer } from 'lucide-react';

import { Race } from './interface';

export const STATUS_ICONS: Record<Race['status'], LucideIcon> = {
  finished: Flag,
  ongoing: RefreshCw,
  upcoming: Timer,
};

export const STATUS_COLORS: Record<Race['status'], string> = {
  finished: 'text-green-500',
  ongoing: 'text-orange-500',
  upcoming: 'text-gray-500',
};
