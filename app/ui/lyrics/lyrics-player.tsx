'use client';

import Link from 'next/link';
import BottomMenu from '@/app/ui/lyrics/bottom-menu';
import { useState } from 'react';

export default function LyricPlayer({ lyric }: { lyric: { name: string; author: string; lyrics: string } }) {
  const [fontSize, setFontSize] = useState(22);
  const [bgColor, setBgColor] = useState('#f5f5dc'); // Spotify-like brown

  const handleFontSizeChange = (delta: number) => {
    setFontSize((size) => Math.max(12, Math.min(40, size + delta)));
  };

  return (
    <div className="relative min-h-screen flex flex-col" style={{ background: bgColor }}>
      {/* Top Bar */}
      <div className="fixed top-0 left-0 w-full z-10 bg-opacity-80 bg-white/80 backdrop-blur flex items-center px-4 py-3 shadow">
        <Link href="/lyrics" className="inline-flex items-center text-blue-600 hover:underline text-lg font-semibold" aria-label="Volver a la lista">
          <span className="text-2xl mr-2">{'<'}</span> Volver a la lista
        </Link>
      </div>

      {/* Lyrics Scrollable Area */}
      <main
        className="flex-1 overflow-y-auto px-4 pt-20 pb-32 flex flex-col items-center"
        style={{ fontSize, transition: 'font-size 0.2s', color: '#181818' }}
        aria-label="Lyrics"
      >
        <h1 className="text-2xl font-bold mb-1 text-center w-full" style={{ fontSize: fontSize + 4 }}>{lyric.name}</h1>
        <h2 className="text-lg text-gray-600 mb-6 text-center w-full" style={{ fontSize: fontSize }}>{lyric.author}</h2>
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