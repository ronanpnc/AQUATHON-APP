
import { UseQueryOptions } from '@tanstack/react-query';

import { useFetch } from '@/hooks/useFetch';

import { Participant } from '@/domains/participant/interface';
import { ISegment } from '@/domains/race/interface';
export interface TrackParticipant extends Participant {
    stampTime: Date,
}

export interface SegmentTrackParticipant extends Participant {
    participants: TrackParticipant[],
    unassignedTime: Partial<TrackParticipant>[],
    segment: ISegment,
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
export const useParticipantTrack = (raceId: string,segmentId: string, config?:UseQueryOptions<SegmentTrackParticipant>) => {
  const url = `${API_BASE_URL}/races/${raceId}/segments/${segmentId}`;
  return useFetch<SegmentTrackParticipant>(['segments', segmentId], url, config);
};
