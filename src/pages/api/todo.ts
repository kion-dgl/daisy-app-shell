// src/pages/api/todos.ts
import type { APIRoute } from 'astro';
import { db, Todo } from "astro:db";


export const GET: APIRoute = async () => {
    const tasks = await db.select().from(Todo);
    return new Response(JSON.stringify(tasks), {
        headers: { 'Content-Type': 'application/json' },
    });
};

export const POST: APIRoute = async ({ request }) => {
    const body = await request.json();
    console.log('a');    
    console.log('b');
    await db.insert(Todo).values([
        body
    ])
    console.log('c');
    return new Response(null, { status: 201 });
};
