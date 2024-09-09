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

import { useDeleteRace } from '@/services/race.services';

interface DeleteRaceButtonProps {
  raceId: string;
}

export function DeleteRaceButton({ raceId }: DeleteRaceButtonProps) {
  const router = useRouter();
  const { toast } = useToast();
  const deleteRaceMutation = useDeleteRace();

  const handleDelete = async () => {
    try {
      await deleteRaceMutation.mutateAsync(raceId);
      toast({
        title: 'Race deleted',
        description: 'The race has been successfully deleted.',
      });
      router.push('/races');
    } catch (error) {
      console.error('Failed to delete race:', error);
      toast({
        title: 'Error',
        description: 'Failed to delete the race. Please try again.',
        variant: 'destructive',
      });
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant='destructive'>
          <Trash2 className='mr-2 h-4 w-4' />
          Delete Race
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className='text-primary-purple'>Confirm Deletion</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete this race? This action cannot be undone.
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
