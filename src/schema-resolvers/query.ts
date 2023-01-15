import { gql } from 'graphql-tag'
import { QueryResolvers } from '../types/resolvers-types'

export const typeDef = gql`
  type Query {
    _empty: String
  }
`

export const resolvers: QueryResolvers = {}
