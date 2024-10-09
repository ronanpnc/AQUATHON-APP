import { PropsWithChildren } from 'react';

import { Participant } from '../participant/interface';

// Enums
export enum RaceStatus {
  Finished = 'finished',
  Ongoing = 'ongoing',
  Upcoming = 'upcoming',
}

// Interfaces
export interface IParticipant {
  bib: number;
  gender: 'male' | 'female';
  firstName: string;
  lastName: string;
  colour?: string;
  dateOfBirth: Date;
  school: string | null;
  segments?: ISegment[];
}

export interface ITimeTrackingSocket {
  participantId: string;
  stampTime: Date;
  segmentId: string;
  bib: number;
  raceId: string;
  status?:string;
  stampId?:string;
}

export interface ITimeTracking {
  _id: string;
  segmentId: string;
  stampTime: Date;
  bib: number;
  raceId: string;
  status?:string;
}

export interface ITimeTrackingSocket {
  _id: string;
  segmentId: string;
  stampTime: Date;
  bib: number;
  raceId: string;
  status?:string;
}
export interface ISegment {
  _id: string;
  type: string;
  mode: string;
  timeTrackId: string[];
  totalCompleted: number;
  status?: string;
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
  segmentsCompleted?: number
  timeTracking?: ITimeTracking[];
  segments: ISegment[];
  totalParticipants: number;
  status: RaceStatus;
}

// Types
export type CreateRaceData = Omit<Race, '_id'>;
export type RaceWithoutSubCollection = Omit<Race, 'participants'|'timeTracking'>;
export type UpdateRaceData = Partial<CreateRaceData> & { id: string };

export interface ComponentProps extends PropsWithChildren {
  className?: string;
  races?: Race[];
}

export interface RaceFormData extends Omit<Race, '_id'> {
  segments: ISegment[];
}


export interface ParticipantStat extends Participant {
        segmentCount: number
}
export interface IDashboard extends Race {
    leaderboard: ParticipantStat[];
}

// Constants
export const segmentTypes = [
  { value: 'swimming', label: 'Swimming' },
  { value: 'running', label: 'Running' },
  { value: 'biking', label: 'Biking' },
  { value: 'transition', label: 'Transition' },
] as const;

// Type for segment types
export type SegmentType = (typeof segmentTypes)[number]['value'];

