import { fetchSongs } from '@/app/lib/data';

export default async function SongsTable() {
  const songs = await fetchSongs();
  console.log(songs);

  return (
    <div>
      {songs?.map((song) => (
        <div 
          key={song.id}
          className='py-6'
        >
          <div>{song.name}</div>
          <div>{song.author}</div>
        </div>
      ))}
    </div>
  );
}