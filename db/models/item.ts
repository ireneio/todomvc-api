import { client } from '../local'

export async function createItemTable(): Promise<void | false> {
  const sql: string = `
    CREATE TABLE IF NOT EXISTS item (
      id serial PRIMARY KEY,
      value text NOT NULL,
      status text NOT NULL,
      created_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `

  try {
    await client.query(sql)
    console.log('[DB] createItemTable Success.')
  } catch(e) {
    console.log('[DB] createItemTable Error: ' + e.message)
    return false
  }
}

export async function dropItemTable(): Promise<void | false> {
  const sql: string = `
    DROP TABLE item
  `

  try {
    await client.query(sql)
    console.log('[DB] dropItemTable Success.')
  } catch(e) {
    console.log('[DB] dropItemTable Error: ' + e.message)
    return false
  }
}

