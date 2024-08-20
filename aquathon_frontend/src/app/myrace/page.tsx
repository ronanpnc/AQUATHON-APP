import RaceCard from '@/components/race/RaceCard';

export default function MyRace() {
  const races = [
    { name: 'Race 1', date: '13 Aug 2024', status: 'Finished', participants: 150 },
    { name: 'Race 1', date: '13 Aug 2024', status: 'On going', participants: 150 },
    { name: 'Race 1', date: '13 Aug 2024', status: 'Not Started', participants: 150 },
    { name: 'Race 1', date: '13 Aug 2024', status: 'Finished', participants: 150 },
  ];

  return (
    <div className='p-4'>
      {races.map((race, index) => (
        <RaceCard
          key={index}
          name={race.name}
          date={race.date}
          status={race.status as 'Finished' | 'On going' | 'Not Started'}
          participants={race.participants}
        />
      ))}
    </div>
  );
}
