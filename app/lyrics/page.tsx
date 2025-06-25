import { lusitana } from '@/app/ui/fonts';
import LyricsList from '@/app/ui/lyrics/lyrics-list';
import Search from '@/app/ui/lyrics/search';
import { fetchLyricsPages } from '@/app/lib/lyrics/data';
import Pagination from '../ui/lyrics/pagination';

export default async function Page (props: {
  searchParams?: Promise<{
    query?: string;
    page?: string;
  }>
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;
  const totalPages = await fetchLyricsPages(query);

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2x1`}>Lista de Letras</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Buscar letra..." />
      </div>
      <span>
        <LyricsList query={query} currentPage={currentPage} />
      </span>
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}
