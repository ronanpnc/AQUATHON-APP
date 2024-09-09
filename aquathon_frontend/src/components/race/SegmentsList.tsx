import { DragDropContext, Draggable, Droppable } from '@hello-pangea/dnd';
import { ChevronDown, GripVertical, Trash2 } from 'lucide-react';
import React, { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input'; // Add this import
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

export interface Segment {
  id: string;
  type: 'swimming' | 'running';
  distance: number; // Add this field
}

interface SegmentsListProps {
  segments: Segment[];
  onSegmentsChange: (segments: Segment[]) => void;
}

export function SegmentsList({ segments, onSegmentsChange }: SegmentsListProps) {
  const [openPopover, setOpenPopover] = useState<string | null>(null);

  const onDragEnd = (result: any) => {
    if (!result.destination) return;
    const items = Array.from(segments);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    onSegmentsChange(items);
  };

  const updateSegment = (index: number, updates: Partial<Segment>) => {
    const newSegments = segments.map((segment, i) =>
      i === index ? { ...segment, ...updates } : segment
    );
    onSegmentsChange(newSegments);
    setOpenPopover(null);
  };

  const deleteSegment = (index: number) => {
    const newSegments = segments.filter((_, i) => i !== index);
    onSegmentsChange(newSegments);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="segments">
        {(provided) => (
          <ul {...provided.droppableProps} ref={provided.innerRef} className="space-y-2 w-full">
            {segments.map((segment, index) => (
              <Draggable key={segment.id} draggableId={segment.id} index={index}>
                {(provided, snapshot) => (
                  <li
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    className={`flex items-center justify-between w-full p-2 bg-gray-100 rounded ${
                      snapshot.isDragging ? 'shadow-lg' : ''
                    }`}
                  >
                    <div className="flex items-center space-x-2 flex-grow">
                      <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0">
                        <span className="font-medium text-white">{index + 1}</span>
                      </div>
                      <Popover
                        open={openPopover === segment.id}
                        onOpenChange={(open) => setOpenPopover(open ? segment.id : null)}
                      >
                        <PopoverTrigger asChild>
                          <Button variant="outline" className="w-full justify-between">
                            {segment.type || 'Select type'}
                            <ChevronDown className="ml-2 h-4 w-4" />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-full p-0 bg-white border border-gray-200 shadow-lg">
                          <Button
                            className="w-full justify-start rounded-none bg-white text-black hover:bg-gray-100"
                            onClick={() => updateSegment(index, { type: 'swimming' })}
                          >
                            Swimming
                          </Button>
                          <Button
                            className="w-full justify-start rounded-none bg-white text-black hover:bg-gray-100"
                            onClick={() => updateSegment(index, { type: 'running' })}
                          >
                            Running
                          </Button>
                        </PopoverContent>
                      </Popover>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => deleteSegment(index)}
                        className="text-red-500 hover:text-red-700 hover:bg-red-100"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                      <div {...provided.dragHandleProps}>
                        <GripVertical className="text-gray-400 flex-shrink-0 cursor-grab" />
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
}
