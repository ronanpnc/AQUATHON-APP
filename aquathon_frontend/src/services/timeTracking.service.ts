
import { useFetch } from '@/hooks/useFetch';

import { Participant } from '@/domains/participant/interface';
import { UseQueryOptions } from '@tanstack/react-query';
export interface TrackParticipant extends Participant {
    stampTime: Date,
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
export const useParticipantTrack = (raceId: string,segmentId: string, config?:UseQueryOptions<TrackParticipant[]>) => {
  const url = `${API_BASE_URL}/races/${raceId}/segments/${segmentId}`;
  return useFetch<TrackParticipant[]>(['segments', segmentId], url, config);
};
