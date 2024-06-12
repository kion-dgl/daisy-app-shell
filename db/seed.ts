import { db, Todo, Users } from 'astro:db';
import { genSaltSync, hashSync } from 'bcrypt-ts';
import { generateId } from 'lucia';

const userId = generateId(15);
await db.insert(Users).values({
	id: userId,
	username: 'admin',
	password: hashSync('password', genSaltSync(10)),
});

// https://astro.build/db/seed
export default async function seed() {
	await db.insert(Todo).values([
		{ task: 'Buy Milk', userId },
		{ task: 'Clean House', userId },
		{ task: 'Call Mom', userId },
		{ task: 'Go to the gym', userId },
		{ task: 'Do the dishes', userId },
		{ task: 'Cook dinner', userId },
		{ task: 'Watch TV', userId },
		{ task: 'Sleep', userId },
		{ task: 'Read a book', userId },
	])
}