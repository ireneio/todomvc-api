import { createItem, getItemAll, updateItem } from "../controllers/item"
import initDb from "../local"
import { createItemTable } from "../models/item"

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
    await createItemTable()
    await createItem('hello world')
    await getItemAll()
  } catch(e) {
    console.error(e.message)
  }
}

await initializeDb()

// await initializeItemTable()

await updateItem(1, 'hello world - edit', -1)

process.exit(0)
