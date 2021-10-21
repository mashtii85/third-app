/**
 * Components - Addresses - List - Table - Types
 */

import { ADDRESS_STATUS } from '../../../../types/address'
import { ENTITIES } from '../../../../constants/entities'

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
  status: ADDRESS_STATUS
  date: string
}

export interface AddressToolbarType {
  entity: ENTITIES
  entityId: number
  type?: string
}
