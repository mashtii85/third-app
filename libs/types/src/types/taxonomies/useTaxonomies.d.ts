import { Taxonomy, UseHookOutput } from '..'
import { ApolloError } from '@apollo/client'

export interface UseTaxonomiesOutput extends UseHookOutput {
  loading: boolean
  error?: ApolloError
  refetch
  taxonomies: Taxonomy[]
}
