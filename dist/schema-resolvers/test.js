import { gql } from 'graphql-tag';
export const typeDef = gql `
  extend type Query {
    test: [Test]!
  }

  type Test {
    id: Int!
    name: String!
    email: String!
  }
`;
export const resolvers = {
    Query: {
        test: async (parent, args, { dataSources }) => {
            return dataSources.testAPI.getAllTests();
        },
    },
};
