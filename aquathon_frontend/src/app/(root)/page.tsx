'use client';

import { Check } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';

export default function HomePage() {
  const [copied, setCopied] = useState(false);
  const shareableLink = `${window.location.origin}/shared/current`;
  const router = useRouter();

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <main className='min-h-screen bg-gradient-to-b from-purple-400 to-purple-600 text-white pt-6 flex flex-col items-center justify-center space-y-8'>
      <CopyToClipboard text={shareableLink} onCopy={handleCopy}>
        <button
          className='bg-white text-purple-600 font-semibold py-3 px-8 rounded-full
                   hover:bg-purple-100 transition duration-300 ease-in-out
                   transform hover:scale-105 shadow-lg'
        >
          {copied ? <Check className='mr-2' /> : null}
          {copied ? 'Copied!' : 'Get Shareable Link'}
        </button>
      </CopyToClipboard>

      <button
        onClick={() => router.push('/races')}
        className='bg-white text-purple-600 font-semibold py-3 px-8 rounded-full
                   hover:bg-purple-100 transition duration-300 ease-in-out
                   transform hover:scale-105 shadow-lg'
      >
        View All Races
      </button>
    </main>
  );
}
