import { PropsWithChildren } from 'react';

export interface Race {
  _id: string;
  title: string;
  date: string;
  startTime: string;
  time: string;
  status: RaceStatus;
  participants?: number;
  swimDistance?: number;
  runDistance?: number;
  timeRaceConfigs: ITimeRaceConfig[];
}

export type CreateRaceData = Omit<Race, '_id'>;

export type UpdateRaceData = Partial<CreateRaceData> & { id: string };

export enum RaceStatus {
  Finished = 'finished',
  Ongoing = 'ongoing',
  Upcoming = 'upcoming',
}

export interface ComponentProps extends PropsWithChildren {
  className?: string;
  races?: Race[];
}

export interface ITimeRaceConfig {
  type: string;
  mode: string;
  timeTrackId: string[];
}

export interface RaceFormData extends Omit<Race, '_id' | 'timeRaceConfigs'> {
  timeRaceConfigs: ITimeRaceConfig[];
}

export interface SegmentType {
  value: string;
  label: string;
  hasDistance: boolean;
}

export const segmentTypes: SegmentType[] = [
  { value: 'Swimming', label: 'Swimming', hasDistance: true },
  { value: 'Running', label: 'Running', hasDistance: true },
  { value: 'Biking', label: 'Biking', hasDistance: true },
  { value: 'Transition', label: 'Transition', hasDistance: false },
];
