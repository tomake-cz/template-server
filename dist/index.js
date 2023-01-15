// general imports
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import lodash from 'lodash';
const { merge } = lodash;
// schema-resolvers
import { typeDef as Query, resolvers as queryRes, } from './schema-resolvers/query.js';
const server = new ApolloServer({
    typeDefs: [Query],
    resolvers: merge(queryRes),
});
const { url } = await startStandaloneServer(server, {
    context: async ({ req }) => ({ token: req.headers.token }),
    listen: { port: 4000 },
});
console.log(`🚀  Server ready at ${url}`);
