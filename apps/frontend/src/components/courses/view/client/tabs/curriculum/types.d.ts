/**
 * Components - Lessons - List - Table - Types
 */

// Types
import { Lesson } from '../../../../../../types/lesson.d'
import { Module } from '../../../../../../types/module.d'
import { STATUS_ACTIVE } from '../../../../../../types/select.d'

interface ModuleToolbarType {
  id?: number
  courseId: number
  title: string
  description?: string
  ordering?: number
  status: STATUS_ACTIVE
  modules: Module[]
  lessons?: Lesson[]
  onChanged: () => void
}
