
import { useFetch } from '@/hooks/useFetch';

import { Participant } from '@/domains/participant/interface';
interface TrackParticipant extends Participant {
    hasBeenTracked: boolean,
    stampTime: Date,
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
export const useParticipantTrack = (raceId: string,segmentId: string) => {
  const url = `${API_BASE_URL}/races/${raceId}/segments/${segmentId}`;
  return useFetch<TrackParticipant[]>(['segments', segmentId], url);
};
