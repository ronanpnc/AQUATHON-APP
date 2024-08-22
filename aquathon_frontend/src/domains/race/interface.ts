export enum RaceStatus {
  Finished = 'Finished',
  Ongoing = 'Ongoing',
  Pending = 'Pending',
}

export interface Race {
  id: string;
  name: string;
  date: string;
  time: string;
  status: RaceStatus;
  participants: number;
}
