import { DragDropContext, Draggable, Droppable, DropResult } from '@hello-pangea/dnd';
import { ChevronDown, GripVertical, Trash2 } from 'lucide-react';
import React, { forwardRef, useImperativeHandle, useState } from 'react';
import { useFieldArray, UseFormReturn } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

import { CreateRaceData, segmentTypes } from '@/domains/race/interface';

import { RaceFormValues } from './CreateRaceForm';



interface SegmentsListProps {
    form: UseFormReturn<RaceFormValues,object>;
}

export const SegmentSchema = z.object({
  type: z.string(),
});
export type Segment = z.infer<typeof SegmentSchema>;
export const SegmentsList = forwardRef(({ form }: SegmentsListProps, ref) => {
  const [openPopover, setOpenPopover] = useState<string | null>(null);
  const { fields, append, move, remove } = useFieldArray({
    control: form.control,
    name: 'segments',
  });

  useImperativeHandle(ref, () => ({
    addSegment,
  }));

  const addSegment = () => {
    append({ type: 'swimming' });
  };

  const onDragEnd = (value:DropResult) => {
    if (value.destination) {
      move(value.source.index, value?.destination.index);
    }
  };

  const updateSegment = (index: number, updates: Partial<Segment>) => {
    form.setValue(`segments.${index}`, { ...fields[index], ...updates } as Segment);
  };

  const deleteSegment = (index: number) => {
    remove(index);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId='segments'>
        {(provided) => (
          <ul {...provided.droppableProps} ref={provided.innerRef} className='space-y-2 w-full'>
            {fields.map((segment, index) => (
              <Draggable key={`segments[${index}]`} draggableId={`segments-${index}`} index={index}>
                {(provided, snapshot) => (
                  <li
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    className={`flex items-center justify-between w-full p-2 bg-gray-100 rounded ${
                      snapshot.isDragging ? 'shadow-lg' : ''
                    }`}
                  >
                    <div className='flex items-center space-x-2 flex-grow'>
                      <div className='w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0'>
                        <span className='font-medium text-white'>{index + 1}</span>
                      </div>
                      <input
                        hidden
                        name={`segments.${index}.type`}
                        defaultValue={`${segment.type}`} // make sure to set up defaultValue
                      />
                      <Popover
                        open={openPopover === segment.id}
                        onOpenChange={(open) => setOpenPopover(open ? segment.id : null)}
                      >
                        <PopoverTrigger asChild>
                          <Button variant='outline' className='w-full justify-between'>
                            {form.watch(`segments.${index}`).type || 'Select type'}
                            <ChevronDown className='ml-2 h-4 w-4' />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className='w-full p-0 bg-white border border-gray-200 shadow-lg'>
                          {segmentTypes.map((segmentType) => (
                            <Button
                              key={segmentType.value}
                              className='w-full justify-start rounded-none bg-white text-black hover:bg-gray-100'
                              onClick={() => updateSegment(index, { type: segmentType.value })}
                            >
                              {segmentType.label}
                            </Button>
                          ))}
                        </PopoverContent>
                      </Popover>
                    </div>
                    <div className='flex items-center space-x-2'>
                      <Button
                        variant='ghost'
                        size='icon'
                        onClick={() => deleteSegment(index)}
                        className='text-red-500 hover:text-red-700 hover:bg-red-100'
                      >
                        <Trash2 className='h-4 w-4' />
                      </Button>
                      <div {...provided.dragHandleProps}>
                        <GripVertical className='text-gray-400 flex-shrink-0 cursor-grab' />
                      </div>
                    </div>
                  </li>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </ul>
        )}
      </Droppable>
    </DragDropContext>
  );
});
