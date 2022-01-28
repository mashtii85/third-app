/**
 * Components - Selects - types
 */

// Constants
import { ENTITIES, TAXONOMY_TYPE } from '@availabletowork/constants'

// Types
import { DocumentNode } from '@apollo/client'
import { LooseObject } from '..'

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

export interface SELECT_STATUS_ACTIVE {
  label: 'Active' | 'Inactive'
  value: 'active' | 'inactive'
}

export interface SelectDataList {
  options: Options[]
}
