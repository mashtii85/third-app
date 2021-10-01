/**
 * Components - Taxonomies - Hooks - helpers
 */
import { ApolloError } from '@apollo/client'
import { UseHookOutput, UseHookProps } from '../../../../types/hook'

import { Taxonomy } from '../../../../types/taxonomy'

export interface TaxonomiesData {
  taxonomies: Taxonomy[]
}

export interface UseDeleteTaxonomyOutput extends UseHookOutput {
  deleteTaxonomy: any
}

export interface DeleteTaxonomyPropsData {
  taxonomy: Taxonomy
}

export interface UseDeleteTaxonomyProps extends UseHookProps<DeleteTaxonomyPropsData> {
  taxonomyId?: number
  category?: string | string[]
  entity?: string
  entityId?: number
  parentId?: number
}
