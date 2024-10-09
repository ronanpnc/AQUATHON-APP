'use client';
import { useParams } from 'next/navigation';
import { Suspense, useContext, useEffect } from 'react';
import { useStore } from 'zustand';

import LeaderboardTable from '@/components/Dashboard/dashboardTable';

import { useDashboard } from '@/services/participant.services';
import { RaceRealTimeContext } from '@/services/sockets/race/store';

//import { metadata } from './layout';

export default function RaceDetailPage() {
  const id = useParams().slug;
  const dashboard = useDashboard(id as string);
  const raceStore = useContext(RaceRealTimeContext);
  const raceSocket = useStore(raceStore!, (state) => state);
  useEffect(() => {
    raceSocket.socketClient.on('startTimeChanged', () => {
       dashboard.refetch();
    })
    raceStore?.getState().socketClient.on('poolChanged', () => {
       dashboard.refetch();
    });
    return () =>  {
        raceSocket.socketClient.off("poolChanged")
        raceSocket.socketClient.off("startTimeChanged")
    }
  }, []);

  if (dashboard.error) return <div>An error occurred: {dashboard.error.message}</div>;
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LeaderboardTable raceData={dashboard.data}/>
    </Suspense>
  );
}
