/**
 * Components - Taxonomies - Hooks - helpers
 */
import { ApolloError } from '@apollo/client'
import { UseHookOutput } from '../../../../types/hook'

import { LooseObject } from '../../../../types/object'
import { Taxonomy } from '../../../../types/taxonomy'

export interface UseTaxonomiesVariable extends LooseObject {
  category?: string | string[]
  parentId?: number
  parent_id?: number
  entity?: string
  entityId?: number
}

export interface TaxonomiesData {
  taxonomies: Taxonomy[]
}

export interface UseTaxonomiesOutput extends UseHookOutput {
  loading: boolean
  error?: ApolloError
  taxonomies: Taxonomy[]
}
