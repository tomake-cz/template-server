import { gql } from 'graphql-tag'
import { Resolvers } from '../types/resolvers-types'

export const typeDef = gql`
  extend type Query {
    tests: [Test]!
  }

  type Test {
    id: Int!
    name: String!
    email: String!
  }
`

export const resolvers: Resolvers = {
  Query: {
    tests: async (parent, args, { dataSources }) => {
      return dataSources.testAPI.getAllTests()
    },
  },
}
