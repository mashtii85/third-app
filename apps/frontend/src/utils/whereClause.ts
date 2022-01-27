/**
 * Utils - Where Clause Generator
 */

// Types
import { GraphQLWhereClause } from '@availabletowork/types'

const camelToSnakeCase = (str: string): string =>
  str.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`)

// model type is 'any' because this function is supposed to work with all kinds of data type
const generateWhereClause = (model: any): GraphQLWhereClause => {
  const where: GraphQLWhereClause = {}
  const entries = Object.entries(model)
  entries?.forEach((entry) => {
    const key = camelToSnakeCase(entry[0])
    const value = entry[1]
    if (key)
      // it's a prototype and if it responds well, it's gonna get more advanced
      switch (typeof value) {
        case 'number':
        case 'boolean':
          where[key] = { _eq: value }
          break
        case 'string':
          where[key] = { _ilike: value }
          break
      }
  })
  return where
}

export { camelToSnakeCase, generateWhereClause }
