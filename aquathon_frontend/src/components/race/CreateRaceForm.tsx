'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { format, parse } from 'date-fns';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { toast } from '@/hooks/use-toast';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';

import { RaceStatus } from '@/domains/race/interface';
import { useCreateRace } from '@/services/race.services';

const formSchema = z.object({
  raceName: z.string().min(1, 'Race name is required'),
  date: z.string().min(1, 'Date is required'),
  time: z.string().min(1, 'Time is required'),
  runDistance: z.number().min(0, 'Run distance must be a positive number'),
  swimDistance: z.number().min(0, 'Swim distance must be a positive number'),
  status: z.nativeEnum(RaceStatus),
});

type FormValues = z.infer<typeof formSchema>;

export default function CreateRaceForm() {
  const router = useRouter();
  const createRaceMutation = useCreateRace();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      raceName: '',
      date: '',
      time: '',
      runDistance: 0,
      swimDistance: 0,
      status: RaceStatus.Upcoming,
    },
  });

  const handleSubmit = (values: FormValues) => {
    const raceDateTime = parse(`${values.date} ${values.time}`, 'yyyy-MM-dd HH:mm', new Date());

    const formattedDate = format(raceDateTime, "yyyy-MM-dd'T'HH:mm:ss.SSSxxx");

    createRaceMutation.mutate(
      {
        title: values.raceName,
        date: formattedDate,
        time: values.time,
        runDistance: values.runDistance,
        swimDistance: values.swimDistance,
        status: values.status,
        startTime: formattedDate,
      },
      {
        onSuccess: () => {
          toast({
            title: 'Race created successfully',
            description: 'Your new race has been added.',
          });
          router.push('/races');
        },
        onError: (error) => {
          toast({
            title: 'Error',
            description: 'Failed to create race. Please try again.',
            variant: 'destructive',
          });
          console.error('Error creating race:', error);
        },
      },
    );
  };

  return (
    <main className='flex min-h-screen w-full justify-center p-8'>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className='max-w-md w-full flex flex-col gap-4'>
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

          <Button type='submit' className='w-full' disabled={createRaceMutation.isPending}>
            {createRaceMutation.isPending ? 'Creating...' : 'Create Race'}
          </Button>
        </form>
      </Form>
    </main>
  );
}
