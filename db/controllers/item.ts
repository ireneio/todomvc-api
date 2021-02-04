import { client } from '../local'
import { isRowsExist, genDateNow } from '../utils/helpers'
import { SqlSchema } from '../../types/sql'

export async function createItem(value: string): Promise<Array<SqlSchema.ItemInput> | false> {
  const sql = `
    INSERT INTO item(value, status)
    VALUES($1, $2)
    RETURNING *
  `

  try {
    const { rows } = await client.query(sql, [value, 0])
    if(isRowsExist(rows) && rows) {
      console.log('[DB] createItem Success: ')
      console.log(rows)
      return rows
    } else {
      throw new Error('Row insertion failed.')
    }
  } catch(e) {
    console.log('[DB] createItem Error: ' + e.message)
    return false
  }
}

export async function getItemAll(): Promise<Array<SqlSchema.ItemInput> | false> {
  const sql = `
    SELECT id, value, status
    FROM item
  `

  try {
    const { rows } = await client.query(sql)
    if(isRowsExist(rows)) {
      console.log('[DB] getItemAll Success: ')
      console.log(rows)
      return rows
    } else {
      return false
    }
  } catch(e) {
    console.log('[DB] getItemAll Error: ' + e.message)
    return false
  }
}

export async function getItemQuery(status: number): Promise<Array<SqlSchema.ItemInput> | false> {
  const sql = `
    SELECT id, value, status
    FROM item
    WHERE status = $1
  `

  console.log(status)

  try {
    const { rows } = await client.query(sql, [status])
    console.log('[DB] getItemQuery Success: ')
    console.log(rows)
    if(isRowsExist(rows)) {
      return rows
    } else {
      return false
    }
  } catch(e) {
    console.log('[DB] getItemQuery Error: ' + e.message)
    return false
  }
}

export async function updateItem(id: number, value: string, status: number): Promise<Array<SqlSchema.ItemInput> | false> {
  const sql = `
    UPDATE item
    SET value = $2, status = $3, last_updated = $4
    WHERE id = $1
    RETURNING *
  `

  try {
    const { rows } = await client.query(sql, [id, value, status, genDateNow()])
    if(isRowsExist(rows)) {
      console.log('[DB] updateItem Success: ')
      console.log(rows)
      return rows
    } else {
      return false
    }
  } catch(e) {
    console.log('[DB] updateItem Error: ' + e.message)
    return false
  }
}

export async function deleteItem(id: number): Promise<Array<SqlSchema.ItemInput> | false> {
  const sql = `
    DELETE from item
    WHERE id = $1
    RETURNING *
  `

  try {
    const { rows } = await client.query(sql, [id])
    if(isRowsExist(rows)) {
      console.log('[DB] deleteItem Success: ')
      console.log(rows)
      return rows
    } else {
      return false
    }
  } catch(e) {
    console.log('[DB] deleteItem Error: ' + e.message)
    return false
  }
}
