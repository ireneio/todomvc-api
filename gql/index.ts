import { Application } from 'express'
import { graphqlHTTP } from 'express-graphql';
import { graphql, buildSchema, GraphQLSchema, Source } from 'graphql'

// Construct a schema, using GraphQL schema language
const schema: GraphQLSchema = buildSchema(`
  type Query {
    hello: String
  }
`);

// The root provides a resolver function for each API endpoint
const root: { [index: string]: Function } = {
  hello: () => {
    return 'Hello world!'
  },
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
