import { fetchSongs } from '@/app/lib/data';
import { UserIcon } from '@heroicons/react/24/outline';
import { UpdateSong, DeleteSong } from '@/app/ui/songs/buttons';

export default async function SongsTable() {
  const songs = await fetchSongs();

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
                <div className="flex items-center justify-between border-b pb-0">
                  <div>
                    <div className="mb-2 flex items-center">
                      <p>{song.name}</p>
                    </div>
                    <p className="ps-7 text-gray-500 line-clamp-1">{song.author}</p>
                    <UserIcon className="relative -top-5 h-[18px] w-[18px] text-gray-500" />
                  </div>
                  <div className="flex justify-end gap-2">
                    <UpdateSong id={song.id} />
                    <DeleteSong id={song.id} />
                  </div>
                </div>
                <div className="flex w-full items-center justify-between pt-4">
                  <p className="text-xs italic line-clamp-3 pe-5 text-gray-700">{song.lyrics}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}