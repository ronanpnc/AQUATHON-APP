import { ITimeTracking } from "../race/interface";

export interface Participant {
  _id: string;
  raceId?: string;
  firstName: string;
  lastName: string;
  bib: number;
  gender: string;
  // status: ParticipantStatus;
  dateOfBirth: string;
  school: string;
  colour: string;
  timeTrackings: ITimeTracking[];
}

export type CreateParticipantData = Omit<Participant, '_id'>;

export type UpdateParticipantData = Partial<CreateParticipantData> & { id: string };

