import { defineAction, z } from "astro:actions";
// import { db, Todo } from "astro:db";

export const server = {
    addTask: defineAction({
        accept: 'form',
        input: z.object({ task: z.string() }),
        handler: async ({ task }) => {
            // add task to db
            console.log(task);
        },
    })
};