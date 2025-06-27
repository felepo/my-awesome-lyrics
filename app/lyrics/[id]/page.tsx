import { fetchLyricsById } from '@/app/lib/lyrics/data';
import Link from 'next/link';

export default async function LyricDetailPage({ params }: { params: { id: string } }) {
  const id = params.id;
  const lyric = await fetchLyricsById(id);

  if (!lyric) {
    return <div>Letra no encontrada</div>;
  }

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded shadow">
      <Link href="/lyrics" className="inline-flex items-center mb-4 text-blue-600 hover:underline">
        <span className="text-xl mr-2">{'<'}</span> Volver a la lista
      </Link>
      <h1 className="text-2xl font-bold mb-2">{lyric.name}</h1>
      <h2 className="text-lg text-gray-600 mb-4">{lyric.author}</h2>
      <pre className="whitespace-pre-wrap text-gray-800">{lyric.lyrics}</pre>
    </div>
  );
} 