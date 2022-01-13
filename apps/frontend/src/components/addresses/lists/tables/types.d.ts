/**
 * Components - Addresss - List - Table - Types
 */

import { STATUS_ACTIVE } from '../../../../types/select.d'

export interface AddressTableRowsType {
  id?: number | undefined
  entity: string
  entityId: number
  name: string
  line1: string
  line2: string
  line3: string
  city: string
  postcode: string
  county: string
  status: STATUS_ACTIVE
  date: string
}

export interface ToolbarModel {
  entity: string
  entityId: number
  type?: string
}
