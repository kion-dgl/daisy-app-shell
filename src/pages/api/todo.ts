// src/pages/api/todos.ts
import type { APIRoute } from 'astro';
import { db, Todo, eq } from "astro:db";


export const GET: APIRoute = async () => {
    const tasks = await db.select().from(Todo);
    return new Response(JSON.stringify(tasks), {
        headers: { 'Content-Type': 'application/json' },
    });
};

export const PATCH: APIRoute = async ({ request }) => {
    const body = await request.json();
    await db.update(Todo).set({ complete: true }).where(eq(Todo.id, body.id));
    return new Response(null, { status: 201 });
};


export const POST: APIRoute = async ({ request }) => {
    const body = await request.json();
    await db.insert(Todo).values([
        body
    ])
    return new Response(null, { status: 201 });
};