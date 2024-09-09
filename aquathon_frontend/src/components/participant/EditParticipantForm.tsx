'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import { CheckIcon, Trash } from 'lucide-react';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { toast } from '@/hooks/use-toast';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

import {
    useParticipant,
    useUpdateParticipant,
} from '@/services/participant.services';


// Schema definition
const formSchema = z.object({
    firstName: z.string().min(1, 'This field is required.'),
    lastName: z.string().min(1, 'This field is required.'),
    bib: z.number().min(1, 'This field is required.'),
    gender: z.string().min(1, 'This field is required.'),
    dateOfBirth: z.string().min(1, 'This field is required.'),
    school: z.string().min(1, 'This field is required.'),
    color: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

const savedColors = ['#EC4899', '#F43F5E', '#84CC16', '#D946EF', '#8B5CF6', '#0EA5E9'];

interface CreateParticipantFormProps {
    raceId: string; // Pass raceId as a prop
}

export default function EditParticipantForm({ raceId }: CreateParticipantFormProps) {
    const [colorState, setColor] = useState<string>('');
    const param = useParams();
    const participant = useParticipant(param.slug as string, param.participantId as string);
    const editParticipantMutation = useUpdateParticipant();

    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {},
    });
    useEffect(() => {
        if (participant.data) {
            form.reset({
                ...participant.data,
                dateOfBirth: format(participant.data.dateOfBirth, 'yyyy-MM-dd').toString(),
            });
        }
    }, [participant.data]);

    const handleSubmit = (values: FormValues) => {
        const formattedDate = format(values.dateOfBirth, 'yyyy-MM-dd');
        editParticipantMutation.mutate(
            {
                id: param.participantId as string,
                raceId: param.slug as string,
                firstName: values.firstName,
                lastName: values.lastName,
                bib: Number(values.bib),
                gender: values.gender.toString(),
                dateOfBirth: formattedDate,
                school: values.school,
                colour: values.color || '',
            },
            {
                onSuccess: () => {
                    toast({
                        title: 'Participant created successfully',
                        description: 'Your new participant has been added.',
                    });
                    //router.push('/participants');
                },
                onError: (error) => {
                    toast({
                        title: 'Error',
                        description: 'Failed to create participant. Please try again.',
                        variant: 'destructive',
                    });
                    console.error('Error creating participant:', error);
                },
            },
        );
    };

    const handleColorChange = (color: string) => {
        form.setValue('color', color);
        setColor(color);
    };

    if (participant.isLoading) return <div></div>;
    return (
        <main className='flex h-screen w-full justify-center p-8'>
            <Form {...form} key={form.watch('gender')}>
                <form onSubmit={form.handleSubmit(handleSubmit)} className='max-w-md w-full flex flex-col gap-4'>
                    <FormField
                        control={form.control}
                        name='firstName'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>First Name</FormLabel>
                                <FormControl>
                                    <Input placeholder='First Name' {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name='lastName'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Last Name</FormLabel>
                                <FormControl>
                                    <Input placeholder='Last Name' {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name='bib'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Bib</FormLabel>
                                <FormControl>
                                    <Input type='number' {...field} onChange={(e) => field.onChange(Number(e.target.value))} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name='gender'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Gender</FormLabel>
                                <FormControl>
                                    <Select onValueChange={field.onChange} defaultValue={field.value?.toString()}>
                                        <SelectTrigger>
                                            <SelectValue placeholder='Select Gender' />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value='male'>Male</SelectItem>
                                            <SelectItem value='female'>Female</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name='dateOfBirth'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Date of Birth</FormLabel>
                                <FormControl>
                                    <Input defaultValue={new Date().toString()} type='date' {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name='school'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>School</FormLabel>
                                <FormControl>
                                    <Input placeholder='School' {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Color Selection */}
                    <div>
                        <FormLabel>Color (Optional)</FormLabel>
                        <div className='grid grid-cols-6 gap-2 mt-2'>
                            {savedColors.map((color) => (
                                <button
                                    key={color}
                                    type='button'
                                    className={`w-8 h-8 rounded-full border-2 ${form.getValues('color') === color ? 'border-gray-500' : 'border-transparent'
                                        }`}
                                    style={{ backgroundColor: color }}
                                    onClick={() => handleColorChange(color)}
                                >
                                    {colorState === color && <CheckIcon color='white' />}
                                </button>
                            ))}
                        </div>
                    </div>

                    <Button type='submit' className='w-full bg-[#7E83DE] text-white font-bold p-5 rounded-xl shadow-sm'>
                        Update Participant
                    </Button>
                </form>
            </Form>
        </main>
    );
}
