import type { ActionAPIContext } from "astro/actions/runtime/store.js";
import { ActionError, defineAction, z } from "astro:actions";
import { db, Todo, Sessions, Users, eq } from "astro:db";
import { Lucia, generateId } from "lucia";
import { genSaltSync, hashSync, compareSync } from "bcrypt-ts";
import { AstroDBAdapter } from "lucia-adapter-astrodb";

const salt = genSaltSync(10);

interface DatabaseUser {
    id: string;
    username: string;
    password: string;
}

const adapter = new AstroDBAdapter(db, Sessions, Users);

export const lucia = new Lucia(adapter, {
    sessionCookie: { attributes: { secure: false } },
    getUserAttributes: (attributes) => ({
        username: attributes.username,
    }),
});

declare module "lucia" {
    interface Register {
        Lucia: typeof lucia;
        DatabaseUserAttributes: Omit<DatabaseUser, "id">;
    }
}

export const server = {
    addTask: defineAction({
        // accept: 'form',
        input: z.object({ task: z.string() }),
        handler: async ({ task }, ctx: ActionAPIContext) => {
            // add task to db
            
            const userId = "placeholder";
            const newTask = await db.insert(Todo).values(
                { task, userId}
            ).get();
            return newTask;
        },
    }),
    signUp: defineAction({
        // accept: 'form',
        input: z.object({
            username: z.string(),
            password: z.string()
        }),
        handler: async ({ username, password }, ctx: ActionAPIContext) => {
            // check if username is valid
            if (
                username.length < 3 ||
                username.length > 31 ||
                !/^[a-z0-9_-]+$/.test(username)
            ) {
                throw new ActionError({
                    code: "UNPROCESSABLE_CONTENT"
                });
            }

            // check if password is valid
            if (password.length < 6 || password.length > 255) {
                throw new ActionError({
                    code: "UNPROCESSABLE_CONTENT"
                });
            }

            const userId = generateId(15);
            const hashedPassword = hashSync(password, salt);


            await db.insert(Users).values({
                id: userId,
                username,
                password: hashedPassword,
            });

            const session = await lucia.createSession(userId, {});
            const sessionCookie = lucia.createSessionCookie(session.id);
            ctx.cookies.set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
        },
    }),
    signIn: defineAction({
        // accept: 'form',
        input: z.object({
            username: z.string(),
            password: z.string()
        }),
        handler: async ({ username, password }, ctx: ActionAPIContext) => {

            const user = await db.select().from(Users).where(eq(Users.username, username)).get();
            console.log(user);
            if (!user) {
                throw new ActionError({
                    code: "UNAUTHORIZED"
                });
            }

            const isValid = await compareSync(password, user.password);
            if (!isValid) {
                throw new ActionError({
                    code: "UNAUTHORIZED"
                });
            }

            const session = await lucia.createSession(user.id, {});
            const sessionCookie = lucia.createSessionCookie(session.id);
            ctx.cookies.set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
            ctx.redirect("/app");
        }
    })
};