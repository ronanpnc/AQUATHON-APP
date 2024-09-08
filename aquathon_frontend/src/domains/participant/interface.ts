export interface Participant {
  _id: string;
  firstname: string;
  lastname: string;
  bib: number;
  gender: string;
  // status: ParticipantStatus;
  dateofbirth?: string;
  school: string;
  color: string;
}

export type CreateParticipantData = Omit<Participant, '_id'>;

export type UpdateParticipantData = Partial<CreateParticipantData> & { id: string };

