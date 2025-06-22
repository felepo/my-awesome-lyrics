'use client';

import { 
  PlusIcon, 
  PencilIcon, 
  TrashIcon 
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { deleteSong } from '@/app/lib/dashboard/actions';
import { useState, useEffect } from 'react';

export function CreateSong() {
  return (
    <Link
      href="/dashboard/songs/create"
      className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
    >
      <span className="hidden md:block">Create Song</span>{' '}
      <PlusIcon className="h-5 md:ml-4"/>
    </Link>
  );
}

export function UpdateSong({ id }: { id: string }) {
  return (
    <Link
      href={`/dashboard/songs/${id}/edit`}
      className="rounded-md border p-2 hover:bg-gray-100"
    >
      <PencilIcon className="w-5" />
    </Link>
  );
}

export function DeleteSong({ id }: { id: string }) {
  const [showModal, setShowModal] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const deleteSongWithId = deleteSong.bind(null, id);

  const handleOpenModal = () => {
    setScrollPosition(window.scrollY);
    setShowModal(true);
  };

  // This hook is to prevent the scrolling behavior when the modal is open
  useEffect(() => {
    if (showModal) {
      // Add styles to prevent scrolling
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollPosition}px`;
      document.body.style.width = '100%';
    } else {
      // Restore the scroll position
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      window.scrollTo(0, scrollPosition);
    }

    return () => {
      // Cleanup function to ensure scrolling is restored
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      window.scrollTo(0, scrollPosition);
    };
  }, [showModal, scrollPosition]);

  return (
    <>
      <button 
        onClick={handleOpenModal} 
        className="rounded-md border p-2 hover:bg-gray-100"
      >
        <span className="sr-only">Eliminar</span>
        <TrashIcon className="w-5" />
      </button>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50">
          <div className="fixed inset-0 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
              <h2 className="text-sm font-semibold mb-4">Confirmar Eliminación</h2>
              <p className="text-sm text-gray-600 mb-6">¿Está seguro que quiere eliminar esta canción? Esta acción no se puede revertir.</p>
              <div className="flex justify-end gap-4">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                >
                  Cancelar
                </button>
                <form action={deleteSongWithId}>
                  <button
                    type="submit"
                    className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700"
                  >
                    Eliminar
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}