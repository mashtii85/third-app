/**
 * Components - Address - List - Table - Types
 */
import { STATUS_ACTIVE } from '../general'

export interface AddressTableRowsType {
  id?: number | undefined
  entity: ENTITIES
  entityId: number
  name: string
  line1: string
  line2: string
  line3: string
  city: string
  postcode: string
  county: string
  meta: any
  status: STATUS_ACTIVE
  date: string
}
