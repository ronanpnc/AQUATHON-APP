'use client';

import { Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React from 'react';

import { useToast } from '@/hooks/use-toast';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';

import { useDeleteParticipant } from '@/services/participant.services';

interface DeleteParticipantButtonProps {
  raceId: string;
  participantId: string;
}

export function DeleteParticipantButton({ raceId, participantId }: DeleteParticipantButtonProps) {
  const router = useRouter();
  const { toast } = useToast();
  const deleteParticipantMutation = useDeleteParticipant();

  const handleDelete = async () => {
    try {
      deleteParticipantMutation.mutate({ raceId, id: participantId });
      toast({
        title: 'Participant deleted',
        description: 'The participant has been successfully deleted.',
      });
      //router.push(`/races/${raceId}/participants`);
      router.back();
    } catch (error) {
      //console.error('Failed to delete participant:', error);
      toast({
        title: 'Error',
        description: 'Failed to delete the participant. Please try again.',
        variant: 'destructive',
      });
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant='ghost' size='icon'>
          <Trash2 className='h-6 w-6 text-red-500' />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className='text-primary-purple'>Confirm Deletion</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete this participant? This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            className='w-full sm:w-auto bg-primary-purple hover:bg-primary-purple/90'
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
