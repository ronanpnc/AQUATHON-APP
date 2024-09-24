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
} from '@/components/ui/alert-dialog';

interface DeleteRaceButtonProps {
  raceId: string;
  reset: () => void;
}

export function DeleteRaceButton({ raceId }: DeleteRaceButtonProps) {
  const router = useRouter();
  const { toast } = useToast();

  const handleReset = async () => {
    try {
      toast({
        title: 'Race Time reset',
        description: 'The race has been successfully reset.',
      });
      router.push('/races');
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to reset the race. Please try again.',
        variant: 'destructive',
      });
    }
  };

  return (
    <AlertDialog>
      <AlertDialogContent className='rounded-lg max-w-max'>
        <AlertDialogHeader>
          <AlertDialogTitle className='text-primary-purple'>Are you sure want to reset this Race?</AlertDialogTitle>
          <AlertDialogDescription>All current race data will be lost. </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className='grid grid-cols-2 gap-2 justify-center items-center'>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleReset} className='bg-red-500 hover:bg-primary-purple/90 mt-2'>
            Reset
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
