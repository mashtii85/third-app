/**
 * Components - Lessons - Questions - Form - Delete - Types
 */

export interface TaxonomyDeleteProps {
  taxonomyId?: number
  type?: string | string[]
  entity?: string
  entityId?: number
  onSuccess: () => void
}
