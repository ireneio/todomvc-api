import { Connection, ConnectionConfig, Request, ColumnValue } from 'tedious'

const DB_USERNAME: string = process.env.NODE_APP_DB_USERNAME || ''
const DB_PW: string = process.env.NODE_APP_DB_PW || ''
const DB_SERVER: string = process.env.NODE_APP_DB_SERVER || ''
const DB_DB: string = process.env.NODE_APP_DB_DB || ''

const config: ConnectionConfig = {
  authentication: {
    options: {
      userName: DB_USERNAME,
      password: DB_PW
    },
    type: "default"
  },
  server: DB_SERVER,
  options: {
    database: DB_DB,
    encrypt: true
  }
}

function queryDatabaseSample(connection: Connection): void {
  console.log("Reading rows from the Table...")

  // Read all rows from table
  const request: Request = new Request(
    `SELECT NOW()`,
    (err: Error, rowCount: number) => {
      if (err) {
        console.error(err.message);
      } else {
        console.log(`${rowCount} row(s) returned`)
      }
    }
  );

  request.on("row", (columns: ColumnValue[]) => {
    columns.forEach(column => {
      console.log("%s\t%s", column.metadata.colName, column.value)
    })
  })

  connection.execSql(request)
  console.log("[DB] Connected and Accepting Queries...")
}

function initAzureSqlServer(): void {
  const connection: Connection = new Connection(config)

  // Attempt to connect and execute queries if connection goes through
  connection.on("connect", (err: Error) => {
    if (err) {
      console.error(err.message)
      throw new Error(err.message)
    } else {
      queryDatabaseSample(connection)
    }
  })
}

export default initAzureSqlServer
