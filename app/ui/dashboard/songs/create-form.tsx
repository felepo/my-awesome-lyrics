'use client';

import Link from 'next/link';
import { Button } from '@/app/ui/dashboard/songs/button';
import { 
  MusicalNoteIcon, 
  UserIcon,
  DocumentTextIcon
} from '@heroicons/react/24/outline';
import { createSong, State } from '@/app/lib/dashboard/actions';
import { useActionState } from 'react';

export default function Form() {
  const initialState: State = { message: null, errors: {} };
  const [state, formAction] = useActionState(createSong, initialState);
  
  return (
    <form 
      action={formAction}
      aria-describedby="create-song-error"
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
                aria-describedby="name-error"
              />
              <MusicalNoteIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
          <div id="name-error" aria-live="polite" aria-atomic="true">
            { state.errors?.name && 
              state.errors.name.map((error: string) => (
                <p key={error} className="mt-2 text-sm text-red-500">
                  {error}
                </p>
              ))
            }
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
                aria-describedby="author-error"
              />
              <UserIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
          <div id="author-error" aria-live="polite" aria-atomic="true">
            { state.errors?.author && 
              state.errors.author.map((error: string) => (
                <p key={error} className="mt-2 text-sm text-red-500">
                  {error}
                </p>
              ))
            }
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
                aria-describedby="lyrics-error"
              />
              <DocumentTextIcon className="pointer-events-none absolute left-3 top-3 h-[18px] w-[18px] text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
          <div id="lyrics-error" aria-live="polite" aria-atomic="true">
            { state.errors?.lyrics && 
              state.errors.lyrics.map((error: string) => (
                <p key={error} className="mt-2 text-sm text-red-500">
                  {error}
                </p>
              ))
            }
          </div>
        </div>

        {/* Form Errors */}
        <div id="create-song-error" aria-live="polite" aria-atomic="true">
          {state.message && 
            <p className="mt-2 text-sm text-red-500" key={state.message}>
              {state.message}
            </p>
          }
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