import { gql } from 'graphql-tag';
export const typeDef = gql `
  extend type Query {
    tests: [Test]!
  }

  type Test {
    id: Int!
    name: String!
    email: String!
  }
`;
export const resolvers = {
    Query: {
        tests: async (parent, args, { dataSources }) => {
            return dataSources.testAPI.getAllTests();
        },
    },
};
