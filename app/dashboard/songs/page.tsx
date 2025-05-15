import SongsTable from "@/app/ui/songs/table";
import { CreateSong } from '@/app/ui/songs/buttons';

export default function Page () {
  return (
    <div className="w-full">
      <p>Songs</p>
      <div className="m-t4 flex items-center justify-between gap-2 md:mt-8">
        <CreateSong />
      </div>
      <SongsTable />
    </div>
  );
}