import { PropsWithChildren } from 'react';

// Enums
export enum RaceStatus {
  Finished = 'finished',
  Ongoing = 'ongoing',
  Upcoming = 'upcoming',
}

// Interfaces
export interface IParticipant {
  bib: number
  gender: "male"|"female"
  firstName: string
  lastName: string
  colour?: string
  dateOfBirth: Date
  school: string | null
  segments?: ISegment[]
}

export interface ITimeTracking {
  participantId: string,
  timeRaceConfigId: string,
  startTime: Date
  endTime: Date
  timeInMs?: BigInteger
}
export interface ISegment {
  type: string;
  mode: string;
  timeTrackId: string[];
}


export interface Race {
  _id?: string;
  title: string;
  date: Date;
  startTime: Date;
  swimDistance: number;
  runDistance: number;
  participants?: IParticipant[];
  colours: string[];
  splitTotal?: number;
  splitCompleted?: number;
  timeTracking?: ITimeTracking[];
  segments: ISegment[];
  totalParticipants?: number;
  status: RaceStatus;
}

// Types
export type CreateRaceData = Omit<Race, '_id'>;
export type UpdateRaceData = Partial<CreateRaceData> & { id: string };

export interface ComponentProps extends PropsWithChildren {
  className?: string;
  races?: Race[];
}

export interface RaceFormData extends Omit<Race, '_id'> {
  segments: ISegment[];
}

// Constants
export const segmentTypes = [
  { value: "swimming", label: "Swimming" },
  { value: "running", label: "Running" },
] as const;

// Type for segment types
export type SegmentType = typeof segmentTypes[number]['value'];
