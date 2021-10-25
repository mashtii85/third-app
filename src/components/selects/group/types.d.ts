/**
 * Components - Selects - GroupEntity - Types.d
 */
// React
import { ReactNode } from 'react'
// Apollo
import { Control, FieldErrors } from 'react-hook-form'
// UI
import { GroupFilter } from '../../groups/hooks/useGroups/types'

export interface GroupSelectProps {
  control: Control
  errors: FieldErrors
  label: string
  name: string
  register: ReactNode
  filters?: Partial<GroupFilter>
}
