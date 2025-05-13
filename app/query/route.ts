import postgres from 'postgres';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

// THIS IS ONLY FOR TESTING PORPUSE, DON'T USE IN ANY ENVIRONMENT

async function listItems() {
	const data = await sql`
    SELECT *
    FROM songs
  `;

	return data;
}

export async function GET() {
  try {
  	return Response.json(await listItems());
  } catch (error) {
  	return Response.json({ error }, { status: 500 });
  }
}
