const songs = [
  {
    id: '410544b2-4001-4271-9855-fec4b6a6442a',
    name: 'Cuán grande es Él',
    lyrics: `Señor, mi Dios, al contemplar los cielos,
      El firmamento y las estrellas mil,
      Al oír Tu voz en los potentes truenos
      Y ver brillar el sol en su cenit,

      Coro: Mi corazón entona esta canción, ¡Cuán grande es Él!
      ¡Cuán grande es Él! Mi corazón entona esta canción,
      ¡Cuán grande es Él! ¡Cuán grande es Él!

      Al recorrer los montes y los valles
      Y ver las bellas flores al pasar,
      Al escuchar el canto de las aves
      Y el murmurar del claro manantial,

      Coro: Mi corazón entona esta canción, ¡Cuán grande es Él!
      ¡Cuán grande es Él! Mi corazón entona esta canción,
      ¡Cuán grande es Él! ¡Cuán grande es Él!

      Cuando recuerdo del amor divino
      Que desde el cielo al Salvador envió,
      Aquel Jesús que por salvarme vino
      Y en una cruz sufrió por mí y murió,

      Coro: Mi corazón entona esta canción, ¡Cuán grande es Él!
      ¡Cuán grande es Él! Mi corazón entona esta canción,
      ¡Cuán grande es Él! ¡Cuán grande es Él!

      Cuando el Señor me llame a Su presencia,
      Al dulce hogar al cielo de esplendor;
      Le adoraré cantando la grandeza
      De Su poder y Su infinito amor.

      Coro: Mi corazón entona esta canción, ¡Cuán grande es Él!
      ¡Cuán grande es Él! Mi corazón entona esta canción,
      ¡Cuán grande es Él! ¡Cuán grande es Él!`,
    author: 'Stuart K. Hine',
  },
  {
    id: 'cc27c14a-0acf-4f4a-a6c9-d45682c144b9',
    name: 'Él me sostendrá',
    lyrics: `Si mi fe ha de caer,
      Él me sostendrá;
      En la tentación yo se,
      Él me sostendrá.
      No podría estar de pie
      En la oscuridad,
      Pues mi amor muy frágil es,
      Él me sostendrá.

      Coro: Él me sostendrá,
      Él me sostendrá;
      Me ama tanto el Salvador,
      Él me sostendrá.

      Él se goza en quien salvó,
      Él me sostendrá;
      Ante Él precioso soy,
      Él me sostendrá.
      Sus promesas fieles son,
      Mi alma guardará;
      Alto precio Él pagó, Él me sostendrá.

      Coro: Él me sostendrá,
      Él me sostendrá;
      Me ama tanto el Salvador,
      Él me sostendrá.

      Él sufrió y por mí murió:
      Él me sostendrá;
      La justicia Él cumplió,
      Él me sostendrá.
      Vida eterna tengo en Él,
      Él me sostendrá;
      Hasta que le pueda ver;
      ¡Él regresará!

      Coro: Él me sostendrá,
      Él me sostendrá;
      Me ama tanto el Salvador,
      Él me sostendrá.`,
    author: 'Ada Habershon y Matthew Merker',
  },
];

const playlists = [
  {
    id: '1a2b3c4d-5e6f-4a8b-9c0d-1e2f3a4b5c6d',
    name: 'Worship Classics',
    description: 'A collection of timeless worship songs that have touched millions of hearts',
  },
  {
    id: '2b3c4d5e-6f7a-4b8c-9d0e-1f2a3b4c5d6e',
    name: 'Sunday Morning Praise',
    description: 'Perfect playlist for your Sunday morning worship service',
  },
  {
    id: '3c4d5e6f-7a8b-4c8d-9e0f-1a2b3c4d5e6f',
    name: 'Spanish Worship',
    description: 'Beautiful worship songs in Spanish to lift your spirit',
  },
  {
    id: '4d5e6f7a-8b9c-4d8e-9f0a-1b2c3d4e5f6a',
    name: 'Quiet Time',
    description: 'Peaceful worship songs for your personal devotion time',
  },
  {
    id: '5e6f7a8b-9c0d-4e8f-9a0b-1c2d3e4f5a6b',
    name: 'Youth Worship',
    description: 'Energetic and contemporary worship songs for young believers',
  },
];

const songPlaylistRelations = [
  {
    song_id: '410544b2-4001-4271-9855-fec4b6a6442a', // Cuán grande es Él
    playlist_id: '1a2b3c4d-5e6f-4a8b-9c0d-1e2f3a4b5c6d', // Worship Classics
  },
  {
    song_id: '410544b2-4001-4271-9855-fec4b6a6442a', // Cuán grande es Él
    playlist_id: '3c4d5e6f-7a8b-4c8d-9e0f-1a2b3c4d5e6f', // Spanish Worship
  },
  {
    song_id: 'cc27c14a-0acf-4f4a-a6c9-d45682c144b9', // Él me sostendrá
    playlist_id: '1a2b3c4d-5e6f-4a8b-9c0d-1e2f3a4b5c6d', // Worship Classics
  },
  {
    song_id: 'cc27c14a-0acf-4f4a-a6c9-d45682c144b9', // Él me sostendrá
    playlist_id: '4d5e6f7a-8b9c-4d8e-9f0a-1b2c3d4e5f6a', // Quiet Time
  },
  {
    song_id: '410544b2-4001-4271-9855-fec4b6a6442a', // Cuán grande es Él
    playlist_id: '2b3c4d5e-6f7a-4b8c-9d0e-1f2a3b4c5d6e', // Sunday Morning Praise
  },
];

const users = [
  {
    id: '6f7a8b9c-0d1e-4f8a-9b0c-1d2e3f4a5b6c',
    name: 'worshipLover',
    email: 'worship.lover@example.com',
    password: 'Worship123!', // Minimum 8 chars, with uppercase, lowercase, number and special char
  },
  {
    id: '7a8b9c0d-1e2f-4a8b-9c0d-1e2f3a4b5c6d',
    name: 'praiseLeader',
    email: 'praise.leader@example.com',
    password: 'Praise123!', // Minimum 8 chars, with uppercase, lowercase, number and special char
  },
  {
    id: '8b9c0d1e-2f3a-4b8c-9d0e-1f2a3b4c5d6e',
    name: 'hymnCollector',
    email: 'hymn.collector@example.com',
    password: 'Hymns123!', // Minimum 8 chars, with uppercase, lowercase, number and special char
  },
];

export { songs, playlists, songPlaylistRelations, users };