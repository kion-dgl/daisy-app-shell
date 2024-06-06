import { db, Users } from 'astro:db';

// https://astro.build/db/seed
export default async function seed() {
	// TODO

	await db.insert(Users).values([
		{ id: 1, name: 'John Doe' },
		{ id: 2, name: 'Jane Doe' },
		{ id: 3, name: 'Bob Smith' },
		{ id: 4, name: 'Alice Smith' },
		{ id: 5, name: 'Bob Johnson' },
		{ id: 6, name: 'Alice Johnson' },
		{ id: 7, name: 'Bob Brown' },
		{ id: 8, name: 'Alice Brown' },
		{ id: 9, name: 'Bob Davis' },
		{ id: 10, name: 'Alice Davis' },
	])
}
