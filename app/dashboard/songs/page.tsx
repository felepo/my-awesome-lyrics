import SongsTable from "@/app/ui/songs/table";
import { CreateSong } from '@/app/ui/songs/buttons';
import { lusitana } from '@/app/ui/fonts';
import { fetchSongsPages } from '@/app/lib/data';

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
        <h1 className={`${lusitana.className} text-2x1`}>Songs</h1>
      </div>
      <div className="m-t4 flex items-center justify-between gap-2 md:mt-8">
        <CreateSong />
      </div>
      <span>
        <SongsTable query={query} currentPage={currentPage} />
      </span>
    </div>
  );
}