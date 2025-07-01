import { fetchLyricsById } from '@/app/lib/lyrics/data';
import LyricsPlayer from '@/app/ui/lyrics/lyrics-player';

export default async function LyricDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const lyric = await fetchLyricsById(id);

  if (!lyric) {
    return <div>Letra no encontrada</div>;
  }

  return <LyricsPlayer lyric={lyric} />;
} 