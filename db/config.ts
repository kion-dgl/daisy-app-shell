import { defineDb, defineTable, column } from 'astro:db';


const Users = defineTable({
  columns: {
    id: column.text({ primaryKey: true }),
    username: column.text({ unique: true }),
    password: column.text()
  }
})

const Sessions = defineTable({
  columns: {
    id: column.text({ primaryKey: true }),
    //userId: column.number({ references: () => Users.columns.id }),
    userId: column.text(),
    expiresAt: column.date()
  }
})

const Todo = defineTable({
  columns: {
    id: column.number({ primaryKey: true, autoIncrement: true }),
    task: column.text(),
    complete: column.boolean({default: false}),
    userId: column.text(),
  }
})

export default defineDb({
  tables: { Todo, Users, Sessions }
});