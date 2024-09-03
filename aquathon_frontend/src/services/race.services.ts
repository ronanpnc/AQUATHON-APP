import { useMutation, useQueryClient } from '@tanstack/react-query';

import { useFetch } from '@/hooks/useFetch';

import { CreateRaceData, Race, UpdateRaceData } from '@/domains/race/interface';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

// Fetch all races
export const useRaceList = () => {
  const url = `${API_BASE_URL}/races/`;
  return useFetch<Race[]>('races', url);
};

// Fetch a single race by ID
export const useRace = (id: string) => {
  const url = `${API_BASE_URL}/races/${id}`;
  return useFetch<Race>(`race-${id}`, url);
};

const createRace = async (raceData: CreateRaceData): Promise<Race> => {
  const response = await fetch(`${API_BASE_URL}/races/`, {
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

// Update an existing race
const updateRace = async ({ id, ...updateData }: UpdateRaceData): Promise<Race> => {
  const response = await fetch(`${API_BASE_URL}/races/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updateData),
  });

  if (!response.ok) {
    throw new Error('Failed to update race');
  }

  return response.json();
};

export const useUpdateRace = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateRace,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['races'] });
      queryClient.invalidateQueries({ queryKey: ['race', data.id] });
    },
  });
};

// Delete a race
const deleteRace = async (id: string): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}/races/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error('Failed to delete race');
  }
};

export const useDeleteRace = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteRace,
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: ['races'] });
      queryClient.removeQueries({ queryKey: ['race', id] });
    },
  });
};
