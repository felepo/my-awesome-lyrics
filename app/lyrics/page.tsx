import { lusitana } from '@/app/ui/fonts';
import LyricsList from '@/app/ui/lyrics/lyrics-list';

export default async function Page (props: {
  searchParams?: Promise<{
    query?: string;
    page?: string;
  }>
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2x1`}>Lista de Letras</h1>
      </div>
      <span>
        <LyricsList query={query} currentPage={currentPage} />
      </span>
    </div>
  );
}
