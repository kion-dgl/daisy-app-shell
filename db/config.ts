import { defineDb, defineTable, column } from 'astro:db';

const Users = defineTable({
  columns: {
    id: column.number({ primaryKey: true, autoIncrement: true }),
    name: column.text(),
  }
});

// https://astro.build/db/config
export default defineDb({
  tables: { Users }
});
