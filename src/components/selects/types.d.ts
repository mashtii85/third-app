/**
 * Components - Selects - types
 */

export enum SELECT_TYPE {
  COURSES
}

export interface SelectProps {
  control: any
  errors: any
  entity: string
  entityId: number
  isClearable: boolean
  name: string
  label: string
  type: SELECT_TYPE
  defaultValue?: string
}

export interface GetQueryTypeOutput {
  variables: {
    entity: string
    entityId: number
  }
  query: string
}

export interface GetQueryTypeInput {
  entity: string
  entityId: number
  type: SELECT_TYPE
}
