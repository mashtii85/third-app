import { TAXONOMY_TYPE } from '../../../types/taxonomy.d'

export interface TaxonomyChildTableProps {
  parentId?: number
  type?: TAXONOMY_TYPE
  entity?: string
  entityId?: number
  // isParent: boolean
}
