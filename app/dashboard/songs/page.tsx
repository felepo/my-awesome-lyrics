import SongsTable from "@/app/ui/songs/table";
import { CreateSong } from '@/app/ui/songs/buttons';
import { lusitana } from '@/app/ui/fonts';

export default function Page () {
  return (
    <div className="w-full">
      <div className='flex w-full items-center justify-between'>
        <h1 className={`${lusitana.className} text-2x1`}>Songs</h1>
      </div>
      <div className="m-t4 flex items-center justify-between gap-2 md:mt-8">
        <CreateSong />
      </div>
      <span>
        <SongsTable />
      </span>
    </div>
  );
}