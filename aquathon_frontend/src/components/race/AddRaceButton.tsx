import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@radix-ui/react-alert-dialog';
import { Plus } from 'lucide-react';
import { useState } from 'react';

import { Button } from '../ui/button';

export function AddRaceButton() {
  const [open, setOpen] = useState(false); 

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger>
        <Test />
      </AlertDialogTrigger>
      <AlertDialogContent className='fixed inset-0 flex items-center justify-center' onClick={() => setOpen(false)}>
        <div className='bg-white p-6 rounded shadow-lg' onClick={(e) => e.stopPropagation()}>
          <AlertDialogTitle>Confirm Action</AlertDialogTitle>
          <AlertDialogDescription>Are you sure you want to proceed with this action?</AlertDialogDescription>
          <AlertDialogAction>Cancel</AlertDialogAction>
          <AlertDialogAction>Confirm</AlertDialogAction>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}

function Test() {
  return (
    <Button variant='outline' size='icon' className='rounded-full h-12 w-12'>
      <Plus strokeWidth={3} className='h-6 w-6' />
    </Button>
  );
}
