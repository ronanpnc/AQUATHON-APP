export function SharedSegmentNav({ title }: { title: string }) {
  return (
    <nav className='w-full bg-primary-purple shadow-md fixed top-0 left-0 right-0 z-10 sicky text-white'>
      <div className='flex items-center justify-center h-16 px-6 text-xl font-semibold'>{title}</div>
    </nav>
  );
}
