import { useMutation, useQueryClient } from '@tanstack/react-query';

import { useFetch } from '@/hooks/useFetch';

import { CreateParticipantData, Participant, UpdateParticipantData } from '@/domains/participant/interface';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

// Fetch all participants
export const useParticipantList = (raceId:string) => {
  const url = `${API_BASE_URL}/races/${raceId}/participants`;
  return useFetch<Participant[]>('participants', url);
};

// Fetch a single participant by ID
export const useParticipant = (id: string) => {
  const url = `${API_BASE_URL}/participants/${id}`;
  return useFetch<Participant>(`participant-${id}`, url);
};

const createParticipant = async (participantData: CreateParticipantData): Promise<Participant> => {
  const response = await fetch(`${API_BASE_URL}/participants/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(participantData),
  });

  if (!response.ok) {
    throw new Error('Failed to create participant');
  }

  return response.json();
};

export const useCreateParticipant = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createParticipant,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['participants'] });
    },
  });
};

// Update an existing participant
const updateParticipant = async ({ id, ...updateData }: UpdateParticipantData): Promise<Participant> => {
  const response = await fetch(`${API_BASE_URL}/participants/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updateData),
  });

  if (!response.ok) {
    throw new Error('Failed to update participant');
  }

  return response.json();
};

export const useUpdateParticipant = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateParticipant,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['participants'] });
      queryClient.invalidateQueries({ queryKey: ['participant', data._id] });
    },
  });
};

// Delete a participant
const deleteParticipant = async (id: string): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}/participants/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error('Failed to delete participant');
  }
};

export const useDeleteParticipant = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteParticipant,
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: ['participants'] });
      queryClient.removeQueries({ queryKey: ['participant', id] });
    },
  });
};
