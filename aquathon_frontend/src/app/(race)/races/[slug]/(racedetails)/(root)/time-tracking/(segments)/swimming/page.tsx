import Container from '@/components/Container';
import TimeButton from '@/components/TimeTracking/TimeButton';

const dummyParticipants = Array.from({ length: 50 }, (_, index) => ({
  id: index + 1,
  bibNumber: (101 + index).toString().padStart(3, '0'),
}));

export default function SwimmingTrackingPage() {
  return (
    <Container>
      <h1 className='text-2xl font-bold mb-4'>Swimming Time Tracking</h1>
      <div className='grid grid-cols-3 gap-4'>
        {dummyParticipants.map((participant) => (
          <TimeButton key={participant.id} bibNumber={participant.bibNumber} />
        ))}
      </div>
    </Container>
  );
}
