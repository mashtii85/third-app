/**
 * Components - Selects - types
 */

import { DocumentNode } from '@apollo/client'
import { ENTITIES } from '../../constants/entities'
import { LooseObject } from '../../types/object'
import { TAXONOMY_TYPE } from '../../types/taxonomy'

export interface SelectProps {
  control: any
  errors?: any
  entity1?: string
  entityId?: number
  isClearable?: boolean
  name: string
  label: string | unknown
  entity: ENTITIES | string | unknown
  taxonomyType?: TAXONOMY_TYPE
  defaultValue?: LooseObject
}

export interface GetQueryTypeOutput {
  variables?: any
  query: DocumentNode
}

export interface GetQueryTypeInput {
  entity?: string
  entityId?: number
  type: ENTITIES | unknown
  filters: any
}
