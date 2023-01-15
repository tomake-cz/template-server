// graphql imports
import { ApolloServer } from '@apollo/server'
import { startStandaloneServer } from '@apollo/server/standalone'

// schema-resolvers
import {
  typeDef as Query,
  resolvers as queryRes,
} from './schema-resolvers/query.js'

// other imports
import lodash from 'lodash'
const { merge } = lodash

export interface Context {
  token?: String
}

const server = new ApolloServer<Context>({
  typeDefs: [Query],
  resolvers: merge(queryRes),
})

const { url } = await startStandaloneServer(server, {
  context: async ({ req }) => ({ token: req.headers.token }),
  listen: { port: 4000 },
})
console.log(`🚀  Server ready at ${url}`)
