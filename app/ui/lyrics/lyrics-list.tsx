import { fetchFilteredLyrics } from '@/app/lib/lyrics/data';
import Link from 'next/link';

export default async function LyricsList({
  query,
  currentPage
}: {
  query: string;
  currentPage: number;
}) {
  const lyrics = await fetchFilteredLyrics(query, currentPage);

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          {/* Lyrics List: mobile */}
          <div className="md:hidden">
            {lyrics?.map((lyric) => (
              <Link
                key={lyric.id}
                href={`/lyrics/${lyric.id}`}
                className="mb-2 block w-full rounded-md bg-white p-4"
              >
                <div className="flex items-center justify-between border-b pb-0">
                  <div>
                    <div className="mb-2 flex items-center">
                      <p>{lyric.name}</p>
                    </div>
                    <p className="text-gray-500 line-clamp-1">{lyric.author}</p>
                  </div>
                </div>
                <div className="flex w-full items-center justify-between pt-4">
                  <p className="text-xs italic line-clamp-3 text-gray-700">{lyric.lyrics}</p>
                </div>
              </Link>
            ))}
          </div>
          {/* Lyrics table: desktop */}
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
                  <span className="sr-only">Acción</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {lyrics?.map((lyric) => (
                <tr
                  key={lyric.id}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap px-3 py-3">
                    {lyric.name}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {lyric.author}
                  </td>
                  <td className="max-w-md whitespace-nowrap px-3 py-3">
                    <p className="truncate text-xs italic text-gray-700">
                      {lyric.lyrics}
                    </p>
                  </td>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex justify-end gap-3">
                      <p>Ver</p>
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