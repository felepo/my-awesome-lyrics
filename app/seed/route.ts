import postgres from 'postgres';
import bcrypt from 'bcryptjs';
import { songs, playlists, songPlaylistRelations, users } from '../lib/placeholder-data';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

async function dropTables() {
  try {
    // Drop tables in reverse order of dependencies
    await sql`DROP TABLE IF EXISTS song_playlist`;
    await sql`DROP TABLE IF EXISTS songs`;
    await sql`DROP TABLE IF EXISTS playlists`;
    await sql`DROP TABLE IF EXISTS users`;
    
    console.log('All tables dropped successfully');
  } catch (error) {
    console.error('Error dropping tables:', error);
    throw error;
  }
}

async function seedSongs() {
  try {
    await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    
    await sql`
      CREATE TABLE IF NOT EXISTS songs(
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        lyrics TEXT,
        author VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP
      );
    `;

    console.log('Songs table created or already exists');

    const insertSongs = await Promise.all(
      songs.map(async (song) => {
        const result = await sql`
          INSERT INTO songs (id, name, lyrics, author)
          VALUES (${song.id}, ${song.name}, ${song.lyrics}, ${song.author})
          ON CONFLICT (id) DO NOTHING
          RETURNING id;
        `;
        console.log(`Inserted song: ${song.name}`, result);
        return result;
      }),
    );

    return insertSongs;
  } catch (error) {
    console.error('Error in seedSongs:', error);
    throw error;
  }
}

async function seedPlaylists() {
  try {
    await sql`
      CREATE TABLE IF NOT EXISTS playlists(
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        description TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP
      );
    `;

    console.log('Playlists table created or already exists');

    const insertPlaylists = await Promise.all(
      playlists.map(async (playlist) => {
        const result = await sql`
          INSERT INTO playlists (id, name, description)
          VALUES (${playlist.id}, ${playlist.name}, ${playlist.description})
          ON CONFLICT (id) DO NOTHING
          RETURNING id;
        `;
        console.log(`Inserted playlist: ${playlist.name}`, result);
        return result;
      }),
    );

    return insertPlaylists;
  } catch (error) {
    console.error('Error in seedPlaylists:', error);
    throw error;
  }
}

async function seedSongPlaylist() {
  try {
    await sql`
      CREATE TABLE IF NOT EXISTS song_playlist(
        song_id UUID NOT NULL,
        playlist_id UUID NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP
      );
    `;

    // Add primary key constraint
    await sql`
      ALTER TABLE song_playlist 
      ADD CONSTRAINT song_playlist_pkey 
      PRIMARY KEY (song_id, playlist_id);
    `;

    // Add foreign key constraints
    await sql`
      ALTER TABLE song_playlist 
      ADD CONSTRAINT song_playlist_song_fk 
      FOREIGN KEY (song_id) 
      REFERENCES songs(id) 
      ON DELETE CASCADE;
    `;

    await sql`
      ALTER TABLE song_playlist 
      ADD CONSTRAINT song_playlist_playlist_fk 
      FOREIGN KEY (playlist_id) 
      REFERENCES playlists(id) 
      ON DELETE CASCADE;
    `;

    console.log('Song_playlist table created or already exists');

    const insertRelations = await Promise.all(
      songPlaylistRelations.map(async (relation) => {
        const result = await sql`
          INSERT INTO song_playlist (song_id, playlist_id)
          VALUES (${relation.song_id}, ${relation.playlist_id})
          ON CONFLICT (song_id, playlist_id) DO NOTHING
          RETURNING song_id, playlist_id;
        `;
        console.log(`Inserted relation: ${relation.song_id} - ${relation.playlist_id}`, result);
        return result;
      }),
    );

    return insertRelations;
  } catch (error) {
    console.error('Error in seedSongPlaylist:', error);
    throw error;
  }
}

async function seedUsers() {
  try {
    await sql`
      CREATE TABLE IF NOT EXISTS users(
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE 
          CHECK (email IS NULL OR email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'),
        password VARCHAR(60) NOT NULL 
          CHECK (length(password) >= 8),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP
      );
    `;

    console.log('Users table created or already exists');

    const insertUsers = await Promise.all(
      users.map(async (user) => {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        const result = await sql`
          INSERT INTO users (id, name, email, password)
          VALUES (${user.id}, ${user.name}, ${user.email}, ${hashedPassword})
          ON CONFLICT (id) DO NOTHING
          RETURNING id;
        `;
        console.log(`Inserted user: ${user.name}`, result);
        return result;
      }),
    );

    return insertUsers;
  } catch (error) {
    console.error('Error in seedUsers:', error);
    throw error;
  }
}

export async function GET() {
  try {
    console.log('Starting database seeding...');
    
    // First, drop all existing tables
    await dropTables();
    
    // Then create and seed tables in the correct order
    const songsResult = await seedSongs();
    console.log('Songs seeded:', songsResult);

    const playlistsResult = await seedPlaylists();
    console.log('Playlists seeded:', playlistsResult);

    const songPlaylistResult = await seedSongPlaylist();
    console.log('Song-Playlist relations seeded:', songPlaylistResult);

    const usersResult = await seedUsers();
    console.log('Users seeded:', usersResult);

    return Response.json({ 
      message: 'Database seeded successfully',
      results: {
        songs: songsResult,
        playlists: playlistsResult,
        songPlaylist: songPlaylistResult,
        users: usersResult
      }
    });
  } catch (error: any) {
    console.error('Error in seeding process:', error);
    return Response.json({ error: error?.message || 'Unknown error occurred' }, { status: 500 });
  }
}
