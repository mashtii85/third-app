/**
 * Types - gql
 */

import { OrderBy } from './orderBy'

type Equality = {
  _eq: number | string
}

type NotEquality = {
  _neq: number | string
}

type ILike = {
  _ilike: string
}

type GreaterThan = {
  _gt: number | string
}

type GreaterThanEqual = {
  _gt: number | string
}

type LessThan = {
  _lt: number | string
}

type LessThanEqual = {
  _lte: string
}

type GraphQLType =
  | Equality
  | ILike
  | LessThan
  | LessThanEqual
  | GreaterThan
  | GreaterThan
  | NotEquality

type Or<T> = {
  _or?: {
    [K in keyof T]?: GraphQLType
  }[]
}

type And<T> = {
  _and?: { [K in keyof T]?: GraphQLType }[]
}

export type GraphqlWhere<T> = {
  [K in keyof T]?: GraphQLType
} & Or<T> &
  And<T>

export type GQLClause<T> = {
  where?: GraphqlWhere<T>
  limit?: number
  offset?: number
  order_by?: OrderBy
}
