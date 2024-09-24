'use client';

import _ from 'lodash';
import { redirect, useParams } from 'next/navigation';
import { useContext, useEffect, useState } from 'react';
import { useStore } from 'zustand';

import Container from '@/components/Container';
import { SharedTimeTrackingNav } from '@/components/layouts/SharedTimeTrackingNav';
import TimeButton from '@/components/TimeTracking/TimeButton';

import { ITimeTrackingSocket } from '@/domains/race/interface';
import { useRace } from '@/services/race.services';
import { RaceRealTimeContext } from '@/services/sockets/race/store';
import { useParticipantTrack } from '@/services/timeTracking.service';
import { queryClient } from '@/utils/providers/ReactQueryProvider';
import TimeStampCard from '@/components/TimeTracking/TimeStampCard';
export default function TrackingPage() {
    const { slug, segmentId } = useParams();
    const race = useRace(slug as string);
    const participants = useParticipantTrack(slug as string, segmentId as string);
    const [activeTab, setActiveTab] = useState('1 Step');
    const raceStore = useContext(RaceRealTimeContext);
    const raceSocket = useStore(raceStore!, (state) => state);

    useEffect(() => {
        raceStore?.getState().socketClient.on('poolChanged', (data) => {
            updater(data);
        });

        return () => {
            raceStore?.getState().socketClient.off('poolChanged');
        };
        //eslint-disable-next-line
    }, [raceSocket]);

    const updater = (nextData?: ITimeTrackingSocket) => {
        queryClient.setQueryData(['segments', segmentId], (oldData?: ITimeTracking[] | undefined) => {
            const arr = [...(oldData || [])];
            const index = _.findIndex(arr, { _id: nextData?.participantId });

            if (nextData?.status === 'reset') {
                // Create a new array with the updated participant
                const updatedArr = arr.map((item, idx) => (idx === index ? { ...item, stampTime: null } : item));
                return updatedArr;
            }
            if (index !== -1 && nextData?.stampTime !== undefined) {
                // Create a new array with the updated participant
                const updatedArr = arr.map((item, idx) => (idx === index ? { ...item, stampTime: nextData.stampTime } : item));
                return updatedArr;
            }
            return arr; // Return the old array if no update occurs
        });
    };
    const onTrackTime = (participantId: string, bib: number) => {
        raceSocket.trackTime({
            raceId: slug as string,
            segmentId: segmentId as string,
            participantId: participantId,
            bib: bib,
        });
    };

    const onResetTrackTime = (participantId: string, bib: number) => {
        raceSocket.resetTrackTime({
            raceId: slug as string,
            segmentId: segmentId as string,
            participantId: participantId,
            bib: bib,
        });
    };

    if (raceSocket.roomId == null || race.data?.startTime == null) {
        redirect('../time-tracking');
    }
    if (participants.isLoading) return null;
    return (
        <div>
            <SharedTimeTrackingNav activeTab={activeTab} setActiveTab={setActiveTab} />
            <Container className='p-4'>
                {activeTab === '1 Step' ? (
                    <div className='grid grid-cols-4 gap-2'>
                        {participants?.data?.map((participant) => (
                            <TimeButton
                                disabled={raceSocket.roomId == null || raceSocket.roomId == undefined}
                                resetTrackTime={onResetTrackTime}
                                key={participant._id}
                                participantId={participant._id}
                                bibNumber={participant.bib.toString()}
                                stampTime={participant?.stampTime}
                                trackTime={onTrackTime}
                                hasBeenTracked={participant.stampTime !== null && participant.stampTime !== undefined}
                            />
                        ))}
                    </div>
                ) : (
                    <TimeStampCard/>
                )}
            </Container>
        </div>
    );
}
