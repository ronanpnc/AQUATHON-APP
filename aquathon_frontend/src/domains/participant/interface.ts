export interface Participant {
  _id: string;
  firstName: string;
  lastName: string;
  bib: number;
  gender: string;
  // status: ParticipantStatus;
  dateofbirth?: string;
  school: string;
  colour: string;
}

export type CreateParticipantData = Omit<Participant, '_id'>;

export type UpdateParticipantData = Partial<CreateParticipantData> & { id: string };

