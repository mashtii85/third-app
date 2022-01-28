// Constants
import { ENTITIES, TAXONOMY_TYPE } from '@availabletowork/constants'

//Types
import { Taxonomy } from '.'
import { UseHookOutput, UseHookProps } from '../general'

interface TaxonomyPropsData {
  taxonomies: { returning: Taxonomy[] }
}

export interface UseCreateTaxonomyProps extends UseHookProps<TaxonomyPropsData> {
  entity?: ENTITIES
  entityId?: number
  parentId?: number
  isParent?: boolean
  taxonomyId?: number
  category?: TAXONOMY_TYPE
  clientId?: number
  meta?: any
}

export interface UseCreateTaxonomyOutput extends UseHookOutput {
  createTaxonomy: any
}
