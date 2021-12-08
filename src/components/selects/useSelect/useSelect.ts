/**
 * Components - Select - Hooks - useSelect
 */

// Apollo
import { DocumentNode, useQuery } from '@apollo/client'
// Types
import { SelectData, UseSelectOutput } from './types'

export const useSelect = (variables: any = {}, query: DocumentNode): UseSelectOutput => {
  const { data, error, loading } = useQuery<SelectData>(query, {
    variables
  })
  const options = data?.options.map(({ label, value }) => ({ label, value })) ?? []
  return { error, loading, options }
}
