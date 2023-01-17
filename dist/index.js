// graphql imports
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
// datasources
import { TestAPI } from './datasources/testAPI';
// prisma
import { prisma } from './prisma/script';
// schema-resolvers
import { typeDef as Query, resolvers as queryRes, } from './schema-resolvers/query.js';
// other imports
import lodash from 'lodash';
const { merge } = lodash;
const server = new ApolloServer({
    typeDefs: [Query],
    resolvers: merge(queryRes),
});
const { url } = await startStandaloneServer(server, {
    context: async ({ req }) => ({
        token: req.headers.token,
        dataSources: { testAPI: new TestAPI({ prisma }) },
    }),
    listen: { port: 4000 },
});
console.log(`🚀  Server ready at ${url}`);
