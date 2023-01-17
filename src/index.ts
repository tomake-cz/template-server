// graphql imports
import { ApolloServer } from '@apollo/server'
import { startStandaloneServer } from '@apollo/server/standalone'

// mocks
import { addMocksToSchema } from '@graphql-tools/mock'
import { makeExecutableSchema } from '@graphql-tools/schema'
import mocks from './mocks.js'

// datasources
import { TestAPI } from './datasources/testAPI.js'

// prisma
import { prisma } from './prisma/script.js'

// schema-resolvers
import {
  typeDef as Query,
  resolvers as queryRes,
} from './schema-resolvers/query.js'
import {
  typeDef as Test,
  resolvers as testRes,
} from './schema-resolvers/test.js'

// other imports
import lodash from 'lodash'
const { merge } = lodash

export interface Context {
  token?: string | string[]
  dataSources: {
    testAPI: TestAPI
  }
}

const server = new ApolloServer<Context>({
  schema: addMocksToSchema({
    schema: makeExecutableSchema({
      typeDefs: [Query, Test],
      resolvers: merge(queryRes, testRes),
    }),
    mocks,
  }),
})

const { url } = await startStandaloneServer(server, {
  context: async ({ req }) => ({
    token: req.headers.token,
    dataSources: { testAPI: new TestAPI({ prisma }) },
  }),
  listen: { port: 4000 },
})
console.log(`🚀  Server ready at ${url}`)
