import postgres from 'postgres';
import { Song } from './definitions';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

export async function fetchSongs() {
  try {
    const data = await sql<Song[]>`
      SELECT 
        songs.id, 
        songs.name, 
        songs.lyrics, 
        songs.author
      FROM songs
    `;
    return data;
  } catch (error) {
    console.error('Database error: ', error);
    throw new Error('Failed to fetch the songs');
  }
}

export async function fetchSongById(id: string) {
  try {
    const data = await sql<Song[]>`
      SELECT
        songs.id,
        songs.name,
        songs.lyrics,
        songs.author
      FROM songs
      WHERE songs.id = ${id}
    `;

    return data[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch song.');
  }
}