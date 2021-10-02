import { UseHookOutput, UseHookProps } from '../../../../types/hook'
import { Taxonomy } from '../../../../types/taxonomy'

interface TaxonomyPropsData {
  taxonomies: { returning: Taxonomy[] }
}

export interface UseCreateTaxonomyProps extends UseHookProps<TaxonomyPropsData> {
  entity?: string
  entityId?: number
  parentId?: number
  isParent?: boolean
  taxonomyId?: number
  category?: string
}

export interface UseCreateTaxonomyOutput extends UseHookOutput {
  createTaxonomy: any
}
