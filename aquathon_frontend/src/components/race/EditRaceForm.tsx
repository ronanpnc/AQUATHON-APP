import { zodResolver } from '@hookform/resolvers/zod';
import { format, parse } from 'date-fns';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { toast } from '@/hooks/use-toast';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';

import { Race, RaceStatus } from '@/domains/race/interface';
import { useUpdateRace } from '@/services/race.services';

const formSchema = z.object({
  raceName: z.string().min(1, 'Race name is required'),
  date: z.string().min(1, 'Date is required'),
  time: z.string().min(1, 'Time is required'),
  runDistance: z.number().min(0, 'Run distance must be a positive number'),
  swimDistance: z.number().min(0, 'Swim distance must be a positive number'),
  status: z.nativeEnum(RaceStatus),
});

type FormValues = z.infer<typeof formSchema>;

interface EditRaceFormProps {
  race: Race;
}

export default function EditRaceForm({ race }: EditRaceFormProps) {
  const router = useRouter();
  const updateRaceMutation = useUpdateRace();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      raceName: race.title,
      date: format(new Date(race.date), 'yyyy-MM-dd'),
      time: format(new Date(race.date), 'HH:mm'),
      runDistance: race.runDistance || 0,
      swimDistance: race.swimDistance || 0,
      status: race.status,
    },
  });

  const handleSubmit = (values: FormValues) => {
    const raceDateTime = parse(`${values.date} ${values.time}`, 'yyyy-MM-dd HH:mm', new Date());
    const formattedDate = format(raceDateTime, "yyyy-MM-dd'T'HH:mm:ss.SSSxxx");

    updateRaceMutation.mutate(
      {
        id: race._id,
        title: values.raceName,
        date: formattedDate,
        time: values.time,
        runDistance: values.runDistance,
        swimDistance: values.swimDistance,
        startTime: formattedDate,
      },
      {
        onSuccess: () => {
          toast({
            title: 'Race updated successfully',
            description: 'Your race has been updated.',
          });
          router.push('/races');
        },
        onError: (error) => {
          toast({
            title: 'Error',
            description: 'Failed to update race. Please try again.',
            variant: 'destructive',
          });
          console.error('Error updating race:', error);
        },
      },
    );
  };

  return (
    <main className='flex w-full items-center justify-center pt-8'>
      <div className='w-full max-w-full bg-white px-4'>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className='space-y-8'>
            <FormField
              control={form.control}
              name='raceName'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Race Name</FormLabel>
                  <FormControl>
                    <Input placeholder='Race Name' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='date'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date</FormLabel>
                  <FormControl>
                    <Input type='date' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='time'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Time</FormLabel>
                  <FormControl>
                    <Input type='time' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='runDistance'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Run Distance (km)</FormLabel>
                  <FormControl>
                    <Input type='number' {...field} onChange={(e) => field.onChange(parseFloat(e.target.value))} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='swimDistance'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Swim Distance (km)</FormLabel>
                  <FormControl>
                    <Input type='number' {...field} onChange={(e) => field.onChange(parseFloat(e.target.value))} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type='submit'
              className='w-full bg-primary-purple hover:bg-primary-purple/90 text-white mt-6'
              disabled={updateRaceMutation.isPending}
            >
              {updateRaceMutation.isPending ? 'Updating...' : 'Update Race'}
            </Button>
          </form>
        </Form>
      </div>
    </main>
  );
}
