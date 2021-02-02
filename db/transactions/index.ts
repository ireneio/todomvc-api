import { createItem, getItemAll, updateItem } from "../controllers/item"
import initDb from "../local"
import { createItemTable, dropItemTable } from "../models/item"

async function initializeDb(): Promise<void> {
  try {
    await initDb()
  } catch(e) {
    console.error(e.message)
  }
}

async function initializeItemTable(): Promise<void> {
  try {
    await initDb()
    await dropItemTable()

  } catch(e) {
    console.error(e.message)
  }

  try {
    await createItemTable()
    await createItem('hello world')
    await getItemAll()
    await updateItem(1, 'hello world - edit', -1)
    await getItemAll()
  } catch(e) {
    console.error(e.message)
  }
}

await initializeDb()
await initializeItemTable()

process.exit(0)
