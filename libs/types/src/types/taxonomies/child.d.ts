// Constants
import { TAXONOMY_TYPE } from '@availabletowork/constants'

export interface TaxonomyChildTableProps {
  parentId?: number
  type?: TAXONOMY_TYPE
  entity?: string
  entityId?: number
}
