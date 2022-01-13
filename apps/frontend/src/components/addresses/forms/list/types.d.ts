/**
 * Components - Addresses - List - Table - Types
 */

import { ENTITIES } from '../../../../constants/entities'
import { STATUS_ACTIVE } from '../../../../types/select.d'

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

export interface AddressToolbarType {
  entity: ENTITIES
  entityId: number
  type: string
}
