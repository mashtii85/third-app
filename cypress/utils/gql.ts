// utils/graphql-test-utils.js

import { CyHttpMessages, HttpResponseInterceptor, StaticResponse } from 'cypress/types/net-stubbing'

// Utility to match GraphQL mutation based on the operation name
export const hasOperationName = (req: any, operationName: string): any => {
  const { body } = req
  // eslint-disable-next-line no-prototype-builtins
  return body.hasOwnProperty('operationName') && body.operationName === operationName
}

// Alias query if operationName matches
export const aliasQuery = (
  req: CyHttpMessages.IncomingHttpRequest,
  operationName: string,
  reply?: HttpResponseInterceptor | StaticResponse
): any => {
  if (hasOperationName(req, operationName)) {
    reply && req.reply(reply)

    req.alias = `gql${operationName}Query`
  }
}

// Alias mutation if operationName matches
export const aliasMutation = (
  req: any,
  operationName: string,
  reply?: HttpResponseInterceptor | StaticResponse
): any => {
  if (hasOperationName(req, operationName)) {
    reply && req.reply(reply)
    req.alias = `gql${operationName}Mutation`
  }
}
