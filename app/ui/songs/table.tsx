import { fetchFilteredSongs } from '@/app/lib/data';
import { UpdateSong, DeleteSong } from '@/app/ui/songs/buttons';

export default async function SongsTable({
  query,
  currentPage
}: {
  query: string;
  currentPage: number;
}) {
  const songs = await fetchFilteredSongs(query, currentPage);

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          {/* Mobile list */}
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
                    <p className="text-gray-500 line-clamp-1">{song.author}</p>
                  </div>
                  <div className="flex justify-end gap-2">
                    <UpdateSong id={song.id} />
                    <DeleteSong id={song.id} />
                  </div>
                </div>
                <div className="flex w-full items-center justify-between pt-4">
                  <p className="text-xs italic line-clamp-3 text-gray-700">{song.lyrics}</p>
                </div>
              </div>
            ))}
          </div>
          {/* Desktop table */}
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  Nombre
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Autor
                </th>
                <th scope="col" className="p-3 py-5 font-medium">
                  Letras
                </th>
                <th scope="col" className="relative py-3 pl-6 pr-3">
                  <span className="sr-only">Edición</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {songs?.map((song) => (
                <tr
                  key={song.id}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap px-3 py-3">
                    {song.name}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {song.author}
                  </td>
                  <td className="max-w-md whitespace-nowrap px-3 py-3">
                    <p className="truncate text-xs italic text-gray-700">
                      {song.lyrics}
                    </p>
                  </td>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex justify-end gap-3">
                      <UpdateSong id={song.id} />
                      <DeleteSong id={song.id} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}