import postgres from "postgres";
import { Song } from './definitions';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });
const ITEMS_PER_PAGE = 6;

export async function fetchFilteredLyrics(
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

export async function fetchLyricsPages(query: string) {
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