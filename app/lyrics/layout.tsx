export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
      <div className="w-full flex-none md:w-64">
        <div className="flex flex-col p-3">
          <div className="flex h-20 shrink-0 items-end rounded-lg bg-blue-600 p-4 md:h-52 text-white">
            Lyrics
          </div>
        </div>
      </div>
      <div className="flex-grow p-6 md:overflow-y-auto md:p-12">{ children }</div>
    </div>
  );
}