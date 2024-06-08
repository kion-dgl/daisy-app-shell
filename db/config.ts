import { defineDb, defineTable, column } from 'astro:db';

const Todo = defineTable({
  columns: {
    id: column.text({ primaryKey: true, autoIncrement: true }),
    task: column.text(),
    complete: column.boolean({default: false})
  }
})

// https://astro.build/db/config
export default defineDb({
  tables: { Todo }
});
