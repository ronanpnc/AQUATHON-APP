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
        <Button variant='ghost' size='icon'>
          <Trash2 className='h-6 w-6 text-red-500' />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className='rounded-lg max-w-max'>
        <AlertDialogHeader>
          <AlertDialogTitle className='text-primary-purple'>Are you sure want to delete this Race?</AlertDialogTitle>
          <AlertDialogDescription>All current race data will be lost. </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className='grid grid-cols-2 gap-2 justify-center items-center'>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete} className='bg-red-500 hover:bg-primary-purple/90 mt-2'>
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
