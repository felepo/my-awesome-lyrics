import { fetchSongs } from '@/app/lib/data';

export default async function SongsTable() {
  const songs = await fetchSongs();
  console.log(songs);

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <div className="md:hidden">
            {songs?.map((song) => (
              <div
                key={song.id}
                className="mb-2 w-full rounded-md bg-white p-4"
              >
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <div className="mb-2 flex items-center">
                      <p>{song.name}</p>
                    </div>
                    <p>{song.author}</p>
                  </div>
                </div>
                <div className="flex w-full items-center justify-between pt-4">
                  <p>Lyrics</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>


    // <div>
    //   {songs?.map((song) => (
    //     <div 
    //       key={song.id}
    //       className='py-6'
    //     >
    //       <div>{song.name}</div>
    //       <div>{song.author}</div>
    //     </div>
    //   ))}
    // </div>
  );
}