import { Plus } from 'lucide-react';

import { Button } from '../ui/button';

export function AddRaceButton() {
  return (
    <Button variant='outline' size='icon' className='rounded-full h-12 w-12'>
      <Plus strokeWidth={3} className='h-6 w-6' />
    </Button>
  );
}
