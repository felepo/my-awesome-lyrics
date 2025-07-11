import postgres from 'postgres';
import { Song } from './definitions';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });
const ITEMS_PER_PAGE = 6;

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

export async function fetchSongsPages(query: string) {
  try {
    const data = await sql`
      SELECT COUNT(*)
      FROM songs
      WHERE
        songs.name ILIKE ${`%${query}%`} OR
        songs.author ILIKE ${`%${query}%`}
    `;
    const totalPages = Math.ceil(Number(data[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of songs.');
  }
}

export async function fetchFilteredSongs(
  query: string,
  currentPage: number
) {
  const offset = ( currentPage - 1 ) * ITEMS_PER_PAGE;
  try {
    const songs = await sql<Song[]>`
      SELECT
        songs.id,
        songs.name,
        songs.lyrics,
        songs.author
      FROM songs
      WHERE
        songs.name ILIKE ${`%${query}%`} OR 
        songs.author ILIKE ${`%${query}%`}
      ORDER BY songs.created_at DESC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;
    return songs
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch songs.');
  }
}