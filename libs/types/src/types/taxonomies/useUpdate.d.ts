// Constants
import { ENTITIES, TAXONOMY_TYPE } from '@availabletowork/constants'

// Types
import { TaxonomyPropsData, UseHookProps } from '..'
import { UseHookOutput } from '../general'

export interface UseUpdateTaxonomyOutput extends UseHookOutput {
  updateTaxonomy: any
}

export interface UseUpdateTaxonomyProps extends UseHookProps<TaxonomyPropsData> {
  entity?: ENTITIES
  entityId?: number
  parentId?: number
  isParent?: boolean
  taxonomyId?: number
  category?: TAXONOMY_TYPE
  clientId?: number
}
