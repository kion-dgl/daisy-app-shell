import type { APIRoute } from 'astro';
import { z } from 'astro:content';
import { db, Users } from "astro:db";

const UserSchema = z.object({
    name: z.string()
});

export const GET: APIRoute = ({ params, request }) => {
    console.log(params)
    console.log(request)
    return new Response(JSON.stringify({
        message: "This was a GET!"
    })
    )
}

export const POST: APIRoute = async ({ request }) => {
    const body = await request.json();
    const validation = UserSchema.safeParse(body);

    if (!validation.success) {
        return new Response(
            JSON.stringify({ message: "Invalid request", errors: validation.error.errors }),
            {
                status: 400,
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );
    }

    const user = await db.insert(Users, validation.data);
    console.log(user)

    return new Response(
        JSON.stringify(user.id),
        {
            headers: {
                'Content-Type': 'application/json'
            }
        }
    );
}

export const DELETE: APIRoute = ({ request }) => {
    console.log(request)
    return new Response(JSON.stringify({
        message: "This was a DELETE!"
    })
    )
}
