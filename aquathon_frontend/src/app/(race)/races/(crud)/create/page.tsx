import CreateRaceForm from '@/components/race/CreateRaceForm';

export default function CreateRacePage() {
  return (
    <div>
      <nav className='w-full bg-white shadow-md fixed top-0 left-0 right-0 z-10'>
        <div className='flex items-center h-16 px-6 text-lg font-bold'>Create New Race</div>
      </nav>
      <div className='mt-12'>
        <CreateRaceForm />
      </div>
    </div>
  );
}
