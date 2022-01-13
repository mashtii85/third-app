/**
 * Components - Addresses - Form - types.d
 */

import { STATUS_ACTIVE } from '../../../../types/select.d'

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
  status: STATUS_ACTIVE
  type: string
}

export interface ADDRESS_STATUS_DROPDOWN {
  text: 'Active' | 'Inactive'
  value: 'active' | 'inactive'
}
