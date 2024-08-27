export interface Race {
  _id: string;
  title: string;
  date: string;
  startTime: string;
  time: string;
  status: RaceStatus;
  participants: number;
}

export enum RaceStatus {
  Finished = 'Finished',
  Ongoing = 'Ongoing',
  Pending = 'Pending',
}
