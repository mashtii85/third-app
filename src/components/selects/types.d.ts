/**
 * Components - Selects - types
 */

import { DocumentNode } from '@apollo/client'
import { ENTITIES } from '../../constants/entities'
import { LooseObject } from '../../types/object'

export interface SelectProps {
  control: any
  errors?: any
  entity?: string
  entityId?: number
  isClearable: boolean
  name: string
  label: string | unknown
  type: ENTITIES | string | unknown
  defaultValue?: LooseObject
}

export interface GetQueryTypeOutput {
  variables?: {
    entity: string
    entityId: number
  }
  query: DocumentNode
}

export interface GetQueryTypeInput {
  entity?: string
  entityId?: number
  type: ENTITIES | unknown
}
