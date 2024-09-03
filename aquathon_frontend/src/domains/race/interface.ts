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
}

export enum RaceStatus {
  Finished = 'finished',
  Ongoing = 'ongoing',
  Upcoming = 'upcoming',
}
