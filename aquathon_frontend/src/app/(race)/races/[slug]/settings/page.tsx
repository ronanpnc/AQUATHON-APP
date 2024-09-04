'use client';

import { Edit, Trash2 } from 'lucide-react';
import Link from 'next/link';
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

import { useDeleteRace, useRace } from '@/services/race.services';

export default function RaceSettingsPage({ params }: { params: { slug: string } }) {
  const router = useRouter();
  const { toast } = useToast();
  const { data: race, isLoading, error } = useRace(params.slug);
  const deleteRaceMutation = useDeleteRace();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!race) return <div>Race not found</div>;

  const handleDelete = async () => {
    try {
      await deleteRaceMutation.mutateAsync(race._id);
      toast({
        title: 'Race deleted',
        description: 'The race has been successfully deleted.',
      });
      router.push('/races');
    } catch (error) {
      console.error('Failed to delete race:', error);
      toast({
        title: 'Error',
        description: 'Failed to delete the race. Please try again.',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">Race Settings</h1>
      <div className="mb-6">
        <p className="mb-2"><strong>Title:</strong> {race.title}</p>
        <p className="mb-2"><strong>Date:</strong> {new Date(race.date).toLocaleDateString()}</p>
        <p><strong>Status:</strong> {race.status}</p>
      </div>
      <div className="flex justify-between">
        <Link href={`/races/${params.slug}/settings/edit`} passHref>
          <Button variant="outline">
            <Edit className="mr-2 h-4 w-4" />
            Edit Race
          </Button>
        </Link>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive">
              <Trash2 className="mr-2 h-4 w-4" />
              Delete Race
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete the race and remove all associated data.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}
