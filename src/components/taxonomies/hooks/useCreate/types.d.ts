import { ENTITIES } from '../../../../constants/entities'
import { UseHookOutput, UseHookProps } from '../../../../types/hook'
import { Taxonomy, TAXONOMY_TYPE } from '../../../../types/taxonomy'

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
}

export interface UseCreateTaxonomyOutput extends UseHookOutput {
  createTaxonomy: any
}
