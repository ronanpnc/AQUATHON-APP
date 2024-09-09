import { DragDropContext, Draggable, Droppable } from '@hello-pangea/dnd';
import { ChevronDown, GripVertical } from 'lucide-react';
import React from 'react';

import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

export interface Segment {
  id: string;
  type: 'swimming' | 'running';
}

interface SegmentsListProps {
  segments: Segment[];
  onSegmentsChange: (segments: Segment[]) => void;
}

export function SegmentsList({ segments, onSegmentsChange }: SegmentsListProps) {
  const onDragEnd = (result: any) => {
    if (!result.destination) return;
    const items = Array.from(segments);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    onSegmentsChange(items);
  };

  const updateSegment = (index: number, updates: Partial<Segment>) => {
    const newSegments = segments.map((segment, i) => (i === index ? { ...segment, ...updates } : segment));
    onSegmentsChange(newSegments);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId='segments'>
        {(provided) => (
          <ul {...provided.droppableProps} ref={provided.innerRef} className='space-y-2'>
            {segments.map((segment, index) => (
              <Draggable key={segment.id} draggableId={segment.id} index={index} disableInteractiveElementBlocking>
                {(provided, snapshot) => (
                  <li
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    className={`flex items-center justify-between space-x-2 p-2 rounded ${
                      snapshot.isDragging ? 'shadow-lg' : ''
                    }`}
                  >
                    <div className='flex items-center space-x-2'>
                      <div className='w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center'>
                        <span className='font-medium text-white'>{index + 1}</span>
                      </div>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button variant='outline' className='w-[120px] justify-between'>
                            {segment.type}
                            <ChevronDown className='ml-2 h-4 w-4' />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className='w-[120px] p-0'>
                          <Button
                            className='w-full justify-start rounded-none'
                            onClick={() => updateSegment(index, { type: 'swimming' })}
                          >
                            Swimming
                          </Button>
                          <Button
                            className='w-full justify-start rounded-none'
                            onClick={() => updateSegment(index, { type: 'running' })}
                          >
                            Running
                          </Button>
                        </PopoverContent>
                      </Popover>
                    </div>
                    <div {...provided.dragHandleProps}>
                      <GripVertical className='text-gray-400 flex-shrink-0' />
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
}
