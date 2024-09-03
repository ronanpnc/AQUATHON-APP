import { useMutation, useQueryClient } from '@tanstack/react-query';

import { useFetch } from '@/hooks/useFetch';

import { Race } from '@/domains/race/interface';

export const useFetchRaces = () => {
  const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/races/`;

  return useFetch<Race[]>('races', url);
};

type CreateRaceData = Omit<Race, '_id'>;

const createRace = async (raceData: CreateRaceData): Promise<Race> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/races/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(raceData),
  });

  if (!response.ok) {
    throw new Error('Failed to create race');
  }

  return response.json();
};

export const useCreateRace = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createRace,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['races'] });
    },
  });
};
