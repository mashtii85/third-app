/**
 * Constants - Status
 */

interface SELECT_STATUS_ACTIVE {
  label: 'Active' | 'Inactive'
  value: 'active' | 'inactive'
}

export const statusActive: SELECT_STATUS_ACTIVE[] = [
  {
    label: 'Active',
    value: 'active'
  },
  {
    label: 'Inactive',
    value: 'inactive'
  }
]
