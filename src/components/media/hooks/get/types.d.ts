/**
 * Components - Media - Hooks - types
 */

// Types
import { Media, MEDIUM_TYPE, MEDIUM_CATEGORY } from '../../../../types/medium.d'
import { STATUS_ACTIVE } from '../../../../types/select.d'
import { LooseObject } from '../../../../types/object'

export interface MediaFilter {
  entity: string
  entityId: number
  type: MEDIUM_TYPE
  status: STATUS_ACTIVE
  caption: string
  category: MEDIUM_CATEGORY
  extension: string
  filename: string
}

export interface UseMediaProps {
  entity: string
  entityId: number
  category?: string
  type?: string
}

export interface MediaData {
  media: Media
}

export interface MediaDataList {
  media: Media[]
}

export interface MediaSearchVariables {
  where: LooseObject
}

export interface MediaVariables {
  mediaId: number
}

export enum GraphQLLogicalOperators {
  _eq = '_eq',
  _contains = '_contains',
  _ilike = '_ilike'
}

export interface GraphQLValue<T> {
  key: T
}
export interface GraphQLOperator {
  [key: string]: GraphQLValue
}

export interface GraphQLWhereClause {
  [key: string]: GraphQLOperator
}
