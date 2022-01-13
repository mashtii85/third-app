/**
 * Components - Taxonomies - Hooks - helpers
 */
import { ApolloError } from '@apollo/client'
import { UseHookOutput } from '../../../../types/hook'

import { STATUS_ACTIVE } from '../../../../types/select.d'
import { Taxonomy, TAXONOMY_TYPE } from '../../../../types/taxonomy.d'

export interface TaxonomyFilters {
  id?: number
  clientId?: number
  type?: TAXONOMY_TYPE | string | string[]
  parentId?: number
  parent_id?: number
  entity?: string
  entityId?: number
  status?: STATUS_ACTIVE
  isParent?: boolean
}

export interface TaxonomiesData {
  taxonomies: Taxonomy[]
}

export interface UseTaxonomiesOutput extends UseHookOutput {
  loading: boolean
  error?: ApolloError
  refetch
  taxonomies: Taxonomy[]
}
