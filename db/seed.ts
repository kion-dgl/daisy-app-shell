import { db, Todo, Users } from 'astro:db';
import { genSaltSync, hashSync } from 'bcrypt-ts';
import { generateId } from 'lucia';

await db.insert(Users).values({
	id: generateId(15),
	username: 'admin',
	password: hashSync('password', genSaltSync(10)),
});

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