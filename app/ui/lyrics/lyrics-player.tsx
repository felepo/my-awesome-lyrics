'use client';

import Link from 'next/link';
import BottomMenu from '@/app/ui/lyrics/bottom-menu';
import { useState } from 'react';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/navigation';

export default function LyricPlayer({ lyric }: { lyric: { name: string; author: string; lyrics: string } }) {
  const [fontSize, setFontSize] = useState(22);
  const [bgColor, setBgColor] = useState('#f5f5dc');
  const router = useRouter();

  const handleFontSizeChange = (delta: number) => {
    setFontSize((size) => Math.max(12, Math.min(40, size + delta)));
  };

  const handleBack = () => {
    if (typeof window !== 'undefined' && window.history.length > 1) {
      router.back();
    } else {
      router.push('/lyrics');
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col" style={{ background: bgColor }}>
      {/* Top Bar */}
      <div className="sticky top-0 w-full z-10 bg-opacity-80 bg-white/80 backdrop-blur flex items-center px-4 py-3 shadow gap-3">
        <button
          type="button"
          onClick={handleBack}
          className="inline-flex items-center text-blue-600 hover:bg-blue-100 rounded-full p-1"
          aria-label="Volver a la lista"
        >
          <ArrowLeftIcon className="w-7 h-7" />
        </button>
        <div className="flex flex-col flex-1 items-center">
          <span className="font-bold leading-tight text-base text-center">{lyric.name}</span>
          <span className="text-gray-600 leading-tight text-base text-center">{lyric.author}</span>
        </div>
      </div>

      {/* Lyrics Scrollable Area */}
      <main
        className="flex-1 overflow-y-auto px-4 pt-5 pb-32 flex flex-col items-center"
        style={{ fontSize, transition: 'font-size 0.2s', color: '#181818' }}
        aria-label="Lyrics"
      >
        <pre className="whitespace-pre-wrap text-center w-full" style={{ background: 'transparent', fontFamily: 'inherit' }}>{lyric.lyrics}</pre>
      </main>

      {/* Bottom Menu */}
      <BottomMenu
        fontSize={fontSize}
        bgColor={bgColor}
        onFontSizeChange={handleFontSizeChange}
        onBgColorChange={setBgColor}
      />
    </div>
  );
} 