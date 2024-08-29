import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@radix-ui/react-alert-dialog';
import { Plus } from 'lucide-react';
import { useState } from 'react';

export function AddRaceButton() {
  const [open, setOpen] = useState(false);

  return (
    <div key='add-race-button'>
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogTrigger>
          <ActionButton />
        </AlertDialogTrigger>
        <AlertDialogContent className='fixed inset-0 flex items-center justify-center' onClick={() => setOpen(false)}>
          <div className='bg-white p-6 rounded shadow-lg' onClick={(e) => e.stopPropagation()}>
            <AlertDialogTitle>Confirm Action</AlertDialogTitle>
            <AlertDialogDescription>Are you sure you want to proceed with this action?</AlertDialogDescription>
            <AlertDialogDescription>Are you sure you want to proceed with this action?</AlertDialogDescription>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

function ActionButton() {
  return (
    <div className='rounded-full h-12 w-12 border-2 border-grey-500 flex items-center justify-center drop-shadow-md'>
      <Plus className='h-8 w-8' />
    </div>
  );
}
