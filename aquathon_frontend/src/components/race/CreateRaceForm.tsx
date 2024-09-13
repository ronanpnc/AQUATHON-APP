'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { format, parse } from 'date-fns';
import { PlusIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useRef } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { toast } from '@/hooks/use-toast';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';

import { RaceStatus } from '@/domains/race/interface';
import { useCreateRace } from '@/services/race.services';

import { SegmentsList, TimeRaceConfigSchema } from './SegmentsList';

 const raceformSchema = z.object({
  raceName: z.string().min(1, 'Race name is required'),
  date: z.string().min(1, 'Date is required'),
  time: z.string().min(1, 'Time is required'),
  runDistance: z.number().min(0, 'Run distance must be a positive number'),
  swimDistance: z.number().min(0, 'Swim distance must be a positive number'),
  status: z.nativeEnum(RaceStatus).optional(),
  timeRaceConfigs: z.array(TimeRaceConfigSchema),
});

export type RaceFormValues = z.infer<typeof raceformSchema>;

export type addSegmentHandle = {
  addSegment: () => void;
};

export default function CreateRaceForm() {
  const router = useRouter();
  const createRaceMutation = useCreateRace();
  const childRef = useRef<addSegmentHandle>();
  const form = useForm<RaceFormValues>({
    resolver: zodResolver(raceformSchema),
  });

  const handleSubmit = (values: RaceFormValues) => {
    const raceDateTime = parse(`${values.date} ${values.time}`, 'yyyy-MM-dd HH:mm', new Date());
    const formattedDate = format(raceDateTime, "yyyy-MM-dd'T'HH:mm:ss.SSSxxx");

    createRaceMutation.mutate(
      {
        title: values.raceName,
        date: formattedDate,
        time: values.time,
        runDistance: values.runDistance,
        swimDistance: values.swimDistance,
        status: RaceStatus.Upcoming,
        startTime: formattedDate,
        timeRaceConfigs: values.timeRaceConfigs.map((item) => ({ ...item, mode: '1-step' })),
      },
      {
        onSuccess: () => {
          toast({
            title: 'Race updated successfully',
            description: 'Your race has been created.',
          });
          router.push('/races');
        },
        onError: () => {
          toast({
            title: 'Error',
            description: 'Failed to create race. Please try again.',
            variant: 'destructive',
          });
        },
      },
    );
  };

  return (
    <main className='flex w-full items-center justify-center pt-8 pb-20'>
      <div className='w-full max-w-full px-4'>
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

            <div className='space-y-4'>
              {form.watch('timeRaceConfigs')?.length !== 0 && <h3 className='text-lg font-semibold'>Segments</h3>}
              <SegmentsList form={form} ref={childRef} />
            </div>

            <div className='bottom-0 left-0 right-0 p-4'>
              <div className='max-w-md mx-auto space-y-6'>
                <Button
                  type='button'
                  className='w-full bg-[#36B37E] hover:bg-[#36B37E]/90 text-white py-8 text-xl font-semibold'
                  onClick={() => childRef?.current?.addSegment()}
                >
                  <PlusIcon className='w-6 h-6 mr-3' />
                  Create Segment
                </Button>

                <Button
                  type='submit'
                  className='w-full bg-primary-purple hover:bg-primary-purple/90 text-white py-8 text-xl font-semibold'
                  disabled={createRaceMutation.isPending}
                >
                  {createRaceMutation.isPending ? 'Saving...' : 'Save'}
                </Button>
              </div>
            </div>
          </form>
        </Form>
      </div>
    </main>
  );
}
