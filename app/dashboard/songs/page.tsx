import SongsTable from "@/app/ui/dashboard/songs/table";
import Search from '@/app/ui/dashboard/songs/search';
import { CreateSong } from '@/app/ui/dashboard/songs/buttons';
import Pagination from '@/app/ui/dashboard/songs/pagination';
import { lusitana } from '@/app/ui/fonts';
import { fetchSongsPages } from '@/app/lib/dashboard/data';

export default async function Page (props: {
  searchParams?: Promise<{
    query?: string;
    page?: string;
  }>
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;
  const totalPages = await fetchSongsPages(query);

  return (
    <div className="w-full">
      <div className='flex w-full items-center justify-between'>
        <h1 className={`${lusitana.className} text-2x1`}>Canciones</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Buscar canciones..." />
        <CreateSong />
      </div>
      <span>
        <SongsTable query={query} currentPage={currentPage} />
      </span>
      <div className='mt-5 flex w-full justify-center'>
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}