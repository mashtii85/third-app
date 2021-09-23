/**
 * Components - Addresses - Form - types.d
 */

import { ADDRESS_STATUS } from '../../../../types/address.d'

interface ToolbarModel {
  entity: string
  entityId: number
}

export interface AddressFormType {
  id: number | undefined
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
}

export interface ADDRESS_STATUS_DROPDOWN {
  text: 'Active' | 'Inactive'
  value: 'active' | 'inactive'
}

export const addressStatus: ADDRESS_STATUS_DROPDOWN[] = [
  { text: 'Active', value: 'active' },
  { text: 'Inactive', value: 'inactive' }
]
