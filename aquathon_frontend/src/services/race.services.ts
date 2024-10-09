import { useMutation, useQuery, useQueryClient, UseQueryOptions } from '@tanstack/react-query';

import { useFetch } from '@/hooks/useFetch';

import { CreateRaceData, Race, RaceWithoutSubCollection, UpdateRaceData } from '@/domains/race/interface';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

// Fetch all races
export const useRaceList = (id?: string) => {
  const url = `${API_BASE_URL}/races/`;
  return useQuery({
    queryKey: ["race"],
    queryFn: async () => {
        const res =  await fetch(url);
        const data = await res.json()
        return data as RaceWithoutSubCollection[];
    }
  });
};

// Fetch a single race by ID
export const useRace = (id: string, config?: UseQueryOptions<Race>) => {
  const url = `${API_BASE_URL}/races/${id}`;
  return useFetch<Race>(['race',id], url,config);
}

// Fetch a single race by ID
export const useRaceStartTime = (id: string) => {
  const url = `${API_BASE_URL}/races/${id}/startTime`;
  return useFetch<Race>(`race-start-${id}`, url);
};;

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
      queryClient.invalidateQueries({ queryKey: ['race', data._id] });
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
