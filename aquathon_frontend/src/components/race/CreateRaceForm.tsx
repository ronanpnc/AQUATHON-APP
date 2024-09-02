'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';

const formSchema = z.object({
  raceName: z.string(),
  date: z.date(),
  time: z.string(),
  split: z.string(),
});

export default function CreateRaceForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    console.log({ values });
  };

  return (
    <main className='flex min-h-screen w-full justify-center p-8'>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className='max-w-md w-full flex flex-col gap-4'>
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
                  <FormControl className='mb-4'>
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
