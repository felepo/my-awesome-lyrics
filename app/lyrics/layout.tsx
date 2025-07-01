'use client';
import { usePathname } from 'next/navigation';

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  // Remove padding if on a lyrics player page (e.g., /lyrics/[id])
  const isLyricsPlayer = /^\/lyrics\/[\w-]+$/.test(pathname);

  return (
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
      <div className={`flex-grow md:overflow-y-auto ${isLyricsPlayer ? 'p-0 md:p-0' : 'p-6 md:p-12'}`}>{ children }</div>
    </div>
  );
}