import RaceCard from '@/components/race/RaceCard';

import { Race, RaceStatus } from '@/domains/race/interface';

export default function MyRace() {
  const races: Race[] = [
    {
      id: '1',
      name: 'City Marathon 2024',
      date: '2024-04-15',
      time: '08:00',
      status: RaceStatus.Pending,
      participants: 5000,
    },
    {
      id: '2',
      name: 'Sunset Beach Run',
      date: '2024-06-03',
      time: '18:30',
      status: RaceStatus.Ongoing,
      participants: 250,
    },
    {
      id: '3',
      name: 'Mountain Trail Challenge',
      date: '2024-07-22',
      time: '07:00',
      status: RaceStatus.Finished,
      participants: 750,
    },
    {
      id: '4',
      name: 'Charity Fun Run',
      date: '2024-09-10',
      time: '10:00',
      status: RaceStatus.Pending,
      participants: 1200,
    },
    {
      id: '5',
      name: 'Winter Wonderland 5K',
      date: '2024-12-18',
      time: '19:00',
      status: RaceStatus.Pending,
      participants: 800,
    },
    {
      id: '6',
      name: 'Spring Half Marathon',
      date: '2025-03-05',
      time: '09:30',
      status: RaceStatus.Finished,
      participants: 3000,
    },
    {
      id: '7',
      name: 'Midnight Glow Run',
      date: '2024-08-15',
      time: '22:00',
      status: RaceStatus.Pending,
      participants: 600,
    },
    {
      id: '8',
      name: 'Autumn Foliage 10K',
      date: '2024-10-20',
      time: '08:30',
      status: RaceStatus.Ongoing,
      participants: 1500,
    },
  ];

  return (
    <div className='p-4'>
      {[...races, ...races, ...races, ...races, ...races].map((race) => (
        <RaceCard key={race.id} race={race} />
      ))}
    </div>
  );
}
