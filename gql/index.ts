import { Application } from 'express'
import { graphqlHTTP } from 'express-graphql';
import { graphql, buildSchema, GraphQLSchema, Source } from 'graphql'
import { createItem, deleteItem, getItemAll, getItemQuery, updateItem } from '../db/controllers/item'
import { SqlSchema } from '../types/sql'

const query: string = `
  type List {
    id: Int,
    value: String,
    status: Int
  }

  type Query {
    list: [List],
    listQuery(status: Int!): [List]
  }

  type Mutation {
    update(id: Int!, value: String!, status: Int!): List,
    create(value: String!): List,
    delete(id: Int!): List
  }
`

const schema: GraphQLSchema = buildSchema(query)

const root: { [index: string]: Function } = {
  list: async (): Promise<Array<SqlSchema.ItemHttpRequestBody> | boolean> => {
    try {
      const rows = await getItemAll()
      if(rows && rows.length > 0) {
        return rows
      }
      return []
    } catch(e) {
      console.error('[Gql] Error: ' + e.message)
      return false
    }
  },
  listQuery: async ({ status }: {status: number}): Promise<Array<SqlSchema.ItemHttpRequestBody> | boolean> => {
    try {
      const rows = await getItemQuery(status)
      if(rows && rows.length > 0) {
        return rows
      }
      return []
    } catch(e) {
      console.error('[Gql] Error: ' + e.message)
      return false
    }
  },
  update: async ({ id, value, status }: SqlSchema.ItemHttpRequestBody): Promise<SqlSchema.ItemHttpRequestBody | boolean> => {
    try {
      const arr: Array<SqlSchema.ItemHttpRequestBody> | boolean = await updateItem(Number(id), value, status)
      return arr ? arr[0] : false
    } catch(e) {
      console.error('[Gql] Error: ' + e.message)
      return false
    }
  },
  create: async ({ value }: SqlSchema.ItemHttpRequestBody): Promise<SqlSchema.ItemHttpRequestBody | boolean> => {
    try {
      const arr: Array<SqlSchema.ItemHttpRequestBody> | boolean = await createItem(value)
      return arr ? arr[0] : false
    } catch(e) {
      console.error('[Gql] Error: ' + e.message)
      return false
    }
  },
  delete: async ({ id }: SqlSchema.ItemHttpRequestBody): Promise<SqlSchema.ItemHttpRequestBody | boolean> => {
    try {
      const arr: Array<SqlSchema.ItemHttpRequestBody> | boolean = await deleteItem(Number(id))
      return arr ? arr[0] : false
    } catch(e) {
      console.error('[Gql] Error: ' + e.message)
      return false
    }
  }
}

// export async function runQuery(source: string | Source): Promise<{ [index: string]: any }> {
//   try {
//     const res: { [index: string]: any } = await graphql(schema, source, root)
//     return res
//   } catch(e) {
//     return new Error('[Gql] Error: ' + e.message)
//   }
// }

export default function initGql(app: Application): void {
  app.use('/gql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
  }))
}
