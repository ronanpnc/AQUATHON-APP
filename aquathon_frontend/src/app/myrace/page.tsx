import RaceCard from '@/components/race/RaceCard';

export default function MyRace() {
  const races = [
    { id: '1', name: 'City Marathon 2024', date: '15 Apr 2024', status: 'Pending', participants: 5000 },
    { id: '2', name: 'Sunset Beach Run', date: '3 Jun 2024', status: 'Ongoing', participants: 250 },
    { id: '3', name: 'Mountain Trail Challenge', date: '22 Jul 2024', status: 'Finished', participants: 750 },
    { id: '4', name: 'Charity Fun Run', date: '10 Sep 2024', status: 'Pending', participants: 1200 },
    { id: '5', name: 'Winter Wonderland 5K', date: '18 Dec 2024', status: 'Pending', participants: 800 },
    { id: '6', name: 'Spring Half Marathon', date: '5 Mar 2025', status: 'Finished', participants: 3000 },
  ];

  return (
    <div className='p-4'>
      {races.map((race) => (
        <RaceCard
          key={race.id}
          id={race.id}
          name={race.name}
          date={race.date}
          status={race.status as 'Finished' | 'Ongoing' | 'Pending'}
          participants={race.participants}
        />
      ))}
    </div>
  );
}
