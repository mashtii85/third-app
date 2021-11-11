import { ENTITIES } from '../../../../constants/entities'
import { UseHookOutput, UseHookProps } from '../../../../types/hook'
import { Taxonomy, TAXONOMY_TYPE } from '../../../../types/taxonomy'

interface TaxonomyPropsData {
  taxonomies: { returning: Taxonomy[] }
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

export interface UseUpdateTaxonomyOutput extends UseHookOutput {
  updateTaxonomy: any
}
