import { TaxonomyPropsData, TAXONOMY_TYPE, UseHookProps } from '..'
import { ENTITIES } from '../../constants'
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
