'use server';

import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import postgres from 'postgres';

const sql = postgres(process.env.POSTGRES_URL!, {ssl: 'require'});

const FormSchema = z.object({
  id: z.string(),
  name: z
    .string()
    .nonempty('El nombre de la canción es requerido.'),
  lyrics: z
    .string()
    .nonempty('Las letras de la canción son requeridas.'),
  author: z.string(),
});

const CreateSong = FormSchema.omit({ id: true });
const UpdateSong = FormSchema.omit({ id: true });

export type State = {
  errors?: {
    name?: string[];
    lyrics?: string[];
    author?: string[];
  };
  message?: string | null;
};

export async function createSong(prevState: State, formData: FormData) {
  // Validate the form data using Zod
  const validateFields = CreateSong.safeParse({
    name: formData.get('name'),
    author: formData.get('author'),
    lyrics: formData.get('lyrics'),
  });

  // If the form data is invalid, return the errors
  if( !validateFields.success ) {
    return {
      errors: validateFields.error.flatten().fieldErrors,
      message: '¡Campos faltantes! Error al crear una canción.'
    };
  }

  // Prepare the data to be inserted into the database
  const { name, author, lyrics } = validateFields.data;

  // Insert the song into the database
  try {
    await sql`
      INSERT INTO songs (name, author, lyrics)
      VALUES (${name}, ${author}, ${lyrics})
    `;
  } catch (error) {
    console.error('Database error: ', error);
    return {
      message: 'Error de base de datos: Error al crear una canción.'
    };
  }

  revalidatePath('/dashboard/songs');
  redirect('/dashboard/songs');
}

export async function updateSong(
  id: string,
  prevState: State,
  formData: FormData
) {
  const validateFields = UpdateSong.safeParse({
    name: formData.get('name'),
    lyrics: formData.get('lyrics'),
    author: formData.get('author'),
  });

  if (!validateFields.success) {
    return {
      errors: validateFields.error.flatten().fieldErrors,
      message: '¡Campos faltantes! Error al actualizar la canción.'
    };
  }

  const { name, lyrics, author } = validateFields.data;

  try {
    await sql`
      UPDATE songs
      SET name = ${name}, lyrics = ${lyrics}, author = ${author}, updated_at = CURRENT_TIMESTAMP
      WHERE id = ${id}
    `;
  } catch (error) {
    console.error('Database error:', error);
    return { 
      message: 'Error de base de datos: Error al crear una canción.' 
    };
  }

  revalidatePath('/dashboard/songs');
  redirect('/dashboard/songs');
}

export async function deleteSong(id: string) {
  await sql`DELETE FROM songs WHERE id = ${id}`;

  revalidatePath('/dashboard/songs');
}
