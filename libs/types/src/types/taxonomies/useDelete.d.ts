/**
 * Components - Taxonomies - Hooks - helpers
 */

//Types
import { Taxonomy } from '.'
import { UseHookOutput, UseHookProps } from '../general'

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
