'use-client';

import Link from 'next/link';
import { Button } from '@/app/ui/button';
import { 
  MusicalNoteIcon, 
  UserIcon,
  DocumentTextIcon
} from '@heroicons/react/24/outline';

export default function Form() {
  return (
    <form 
      action=""
      aria-describedby="create-invoice-error"
    >
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* Name */}
        <div className="mb-4">
          <label htmlFor="name" className="mb-2 block text-sm font-medium">
            Nombre de canción
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input 
                id="name"
                name="name"
                type="text"
                placeholder="Ingrese nombre de canción"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
              <MusicalNoteIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>

        {/* Author */}
        <div className="mb-4">
          <label htmlFor="author" className="mb-2 block text-sm font-medium">
            Nombre de autor
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input 
                id="author"
                name="author"
                type="text"
                placeholder="Ingrese nombre del autor de la canción"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
              <UserIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>

        {/* Lyrics */}
        <div className="mb-4">
          <label htmlFor="lyrics" className="mb-2 block text-sm font-medium">
            Letra de la canción
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <textarea
                id="lyrics"
                name="lyrics"
                placeholder="Ingrese la letra de la canción"
                rows={6}
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
              <DocumentTextIcon className="pointer-events-none absolute left-3 top-3 h-[18px] w-[18px] text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/songs"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancelar
        </Link>
        <Button type="submit">Crear Canción</Button>
      </div>
    </form>
  );
}