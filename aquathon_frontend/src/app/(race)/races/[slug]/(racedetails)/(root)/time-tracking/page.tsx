'use client';
import { Check } from 'lucide-react';
import { useParams } from 'next/navigation';
import { useContext, useEffect, useState } from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';
import { useStore } from 'zustand';

import Container from '@/components/Container';
import RaceTimer from '@/components/TimeTracking/RaceTimer';
import SegmentCard from '@/components/TimeTracking/SegmentCard';

import { useRace } from '@/services/race.services';
import { useSegmentList } from '@/services/segment.services';
import { RaceRealTimeContext } from '@/services/sockets/race/store';
import { queryClient } from '@/utils/providers/ReactQueryProvider';
import { ITimeTrackingSocket, Race } from '@/domains/race/interface';
import _ from 'lodash';

export default function RaceDetailPage() {
  const [copied, setCopied] = useState(false);
  const id = useParams().slug;
  const race = useRace(id as string);
  const socketContext = useContext(RaceRealTimeContext);
  const raceSocket = useStore(socketContext!, (state) => state);
  const shareableLink = `${window.location.origin}/shared/${id}`;
  const [time, setTime] = useState<Date | null>(null);

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  const startTime = () => {
    raceSocket.startTime(id as string);
  };
  const resetTime = () => {
    raceSocket.resetTime(id as string);
  };
  useEffect(() => {
    race.data?.startTime ? setTime(new Date(race.data.startTime)) : null;
  }, [race.data])
  useEffect(() => {
    raceSocket.subscribe(id as string);
    raceSocket.socketClient.on('startTimeChanged', (time) => {
      if (time) {
        setTime(new Date(time));
        race.refetch();
        return;
      }
        race.refetch();
        setTime(null);
    });
    raceSocket.socketClient.on('poolChanged', (data) => {
        updater(data)
    });

    return () =>  {
        raceSocket.socketClient.off("poolChanged")
        raceSocket.socketClient.off("startTimeChanged")
    }
  }, []);

  const updater = (nextData?: ITimeTrackingSocket) => {
    queryClient.setQueryData(['race', id], (oldData?: Race | undefined) => {
      const arr = [...(oldData?.segments || [])];
      const index = _.findIndex(arr, { _id: nextData?.segmentId });
      let updatedArr;
      if (nextData?.status === 'reset') {
        // Create a new array with the updated participant
        updatedArr = arr.map((item, idx) => (idx === index ? { ...item, totalCompleted: Math.max(0,item.totalCompleted! - 1) } : item));
         return ({...oldData, segments: updatedArr}); // Return the old array if no update occurs
      }
      if (index !== -1 && nextData?.stampTime !== undefined) {
        // Create a new array with the updated participant
         updatedArr = arr.map((item, idx) => (idx === index ? { ...item, totalCompleted: Math.max(0,item.totalCompleted! + 1) } : item));
        return ({...oldData, segments: updatedArr}); // Return the old array if no update occurs
      }
    });
  };
  if (race.data === undefined) return  null;
  return (
    <Container>
      {race.data?.segments.map((segment, index) => (
        <SegmentCard startTime={race.data.startTime} key={index} segment={segment} totalParticipant={race.data.totalParticipants} completedParticipants={segment.totalCompleted}/>
      ))}
      <RaceTimer time={time} startTimer={startTime} resetTimer={resetTime} participant={race.data?.totalParticipants}  total={race.data.totalParticipants * race.data.segments.length} completed={race.data?.segments.reduce((a,seg) => seg.totalCompleted! + a,  0)}/>
      <CopyToClipboard text={shareableLink} onCopy={handleCopy}>
        <button
          className='bg-white text-purple-600 font-semibold py-3 px-8 rounded-full
                   hover:bg-purple-100 transition duration-300 ease-in-out
                   transform hover:scale-105 shadow-lg'
        >
          {copied ? <Check className='mr-2' /> : null}
          {copied ? 'Copied!' : `${raceSocket.roomId}`}
        </button>
      </CopyToClipboard>
    </Container>
  );
}
