import Form from '@/app/ui/songs/edit-form';
import { fetchSongById } from '@/app/lib/dashboard/data';
import { notFound } from 'next/navigation';

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const id = params.id;
  const song = await fetchSongById(id);

  if (!song) notFound();

  return (
    <main>
      <Form song={song} />
    </main>
  );
}