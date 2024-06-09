import { db, Todo } from 'astro:db';

// https://astro.build/db/seed
export default async function seed() {
	await db.insert(Todo).values([
		{ task: 'Buy Milk' },
		{ task: 'Clean House' },
		{ task: 'Call Mom' },
		{ task: 'Go to the gym' },
		{ task: 'Do the dishes' },
		{ task: 'Cook dinner' },
		{ task: 'Watch TV' },
		{ task: 'Sleep' },
		{ task: 'Read a book' },
	  ])
}