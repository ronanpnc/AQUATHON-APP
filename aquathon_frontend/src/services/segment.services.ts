import { useFetch } from '@/hooks/useFetch';

import { ISegment } from '@/domains/race/interface';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

// Fetch all segments for a specific race
export const useSegmentList = (raceId: string) => {
  const url = `${API_BASE_URL}/races/${raceId}/segments`;
  return useFetch<ISegment[]>('segments', url);
};

// Fetch a single segment by ID
export const useSegment = (raceId: string, segmentId: string) => {
  const url = `${API_BASE_URL}/races/${raceId}/segments/${segmentId}`;
  return useFetch<ISegment>(`segment-${segmentId}`, url);
};
