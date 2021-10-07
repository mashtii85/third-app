/**
 * Components - Types - GrapgQL
 */

export interface GraphQLCondition<T> {
  [key: string]: T
}

export interface GraphQLWhereClause {
  [key: string]: GraphQLCondition
}
