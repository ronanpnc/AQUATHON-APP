'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';

const formSchema = z.object({
  raceName: z.string().refine((value) => value.trim() !== '', {
    message: 'Race Name cannot be empty',
    path: ['raceName'],
  }),
  date: z.string().refine(
    (value) => {
      const selectedDate = new Date(value);
      const currentDate = new Date();
      return selectedDate > currentDate;
    },
    {
      message: 'Invalid date',
      path: ['date'],
    },
  ),
  time: z.string().refine(
    (value) => {
      const selectedTime = new Date(`01/01/2000 ${value}`);
      const currentTime = new Date();
      return selectedTime > currentTime;
    },
    {
      message: 'Invalid time',
      path: ['time'],
    },
  ),
  split: z.string().refine((value) => value.trim() !== '', {
    message: 'Split cannot be empty',
    path: ['split'],
  }),
});

export default function CreateRaceForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      raceName: '',
      date: '',
      time: '',
      split: '',
    },
  });

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    console.log({ values });
  };

  return (
    <main className='flex min-h-screen w-full flex-col items-center p-8'>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className='max-w-md w-full flex flex-col gap'>
          <FormField
            control={form.control}
            name='raceName'
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Race Name</FormLabel>
                  <FormControl>
                    <Input placeholder='Race Name' type='text' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <FormField
            control={form.control}
            name='date'
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Date</FormLabel>
                  <FormControl>
                    <Input placeholder='Date' type='date' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <FormField
            control={form.control}
            name='time'
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Time</FormLabel>
                  <FormControl>
                    <Input placeholder='Time' type='time' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <FormField
            control={form.control}
            name='split'
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Split</FormLabel>
                  <FormControl>
                    <Input placeholder='Split' type='text' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <Button type='submit' className='w-full'>
            Submit
          </Button>
        </form>
      </Form>
    </main>
  );
}
