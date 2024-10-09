import { Camera } from 'lucide-react';
import React, { useEffect, useState } from 'react';

import { IDashboard, ParticipantStat } from '@/domains/race/interface';

interface LeaderboardTableProp {
  raceData: IDashboard|undefined;
}
const emptySlot = '--:--:--.-';
const LeaderboardTable = ({ raceData }: LeaderboardTableProp) => {
  const [searchTerm, setSearchTerm] = useState('');
  //const [filteredParticipants, setFilteredParticipants] = useState([]);

  //  useEffect(() => {
  //    if (raceData && raceData.participants) {
  //      setFilteredParticipants(raceData.participants.filter(participant =>
  //        `${participant.firstName} ${participant.lastName}`.toLowerCase().includes(searchTerm.toLowerCase())
  //      ));
  //    }
  //  }, [raceData, searchTerm]);
  if (raceData === undefined)  return;

  const getSegmentTime = (participant: ParticipantStat, segmentId: string) => {
    const segment = raceData.segments.find((s) => s._id === segmentId);
    if (!segment) return emptySlot;

    const trackingEntryIndex = participant.timeTrackings.findIndex((t) => t.segmentId.toString() === segment._id.toString());
    const trackingEntry =participant.timeTrackings[trackingEntryIndex];
    if (!trackingEntry) return emptySlot;

    let startTime;
    trackingEntryIndex == 0 ?
     startTime = raceData.startTime:
     startTime = participant.timeTrackings[trackingEntryIndex - 1].stampTime



    const endTime =trackingEntry.stampTime;
    return formatTime(new Date(endTime).getTime() - new Date(startTime).getTime());
  };

  const getTotalTime = (participant: ParticipantStat) => {
    if (participant.timeTrackings.length < raceData.segments.length) return emptySlot;
    const lastTracking = participant.timeTrackings[participant.timeTrackings.length - 1];
    return formatTime(new Date(lastTracking.stampTime).getTime() - new Date(raceData.startTime).getTime());
  };

  return (
    <div className='w-full p-4 bg-gray-100 rounded-lg shadow-md'>
      <div className='flex justify-between mb-4'>
        <input
          type='text'
          placeholder='Search'
          className='px-3 py-2 border rounded-md'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className='overflow-x-auto'>
        <table className='min-w-full bg-white border border-gray-300'>
          <thead className='bg-gray-200'>
            <tr>
              <th className='px-4 py-2 text-left'>Rank</th>
              <th className='px-4 py-2 text-left'>Bib</th>
              <th className='px-4 py-2 text-left'>Participants Name</th>
              {raceData.segments.map((item, index) => (
                <th className='px-4 py-2 text-left' key={index + item.type}>{item.type}</th>
              ))}
              <th className='px-4 py-2 text-left'>Total Time</th>
            </tr>
          </thead>
          <tbody>
            {raceData?.leaderboard?.map((participant: ParticipantStat, index: number) => (
              <tr key={participant._id} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                <td className='px-4 py-2 font-medium'>{getOrdinal(index + 1)}</td>
                <td className='px-4 py-2'>{participant.bib}</td>
                <td className='px-4 py-2'>{`${participant.firstName} ${participant.lastName}`}</td>
                {raceData.segments.map((item, index) => (
                  <td key={index + item.type} className='px-4 py-2'>{getSegmentTime(participant,item._id)}</td>
                ))}
                <td className='px-4 py-2'>{getTotalTime(participant)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const getOrdinal = (n: number) => {
  const s = ['th', 'st', 'nd', 'rd'];
  const v = n % 100;
  return n + (s[(v - 20) % 10] || s[v] || s[0]);
};
const formatTime = (ms: number): string => {
  const totalSeconds = Math.floor(ms / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  const milliseconds = ms % 1000;

  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}.${String(milliseconds).padStart(3, '0')}`;
};

export default LeaderboardTable;
