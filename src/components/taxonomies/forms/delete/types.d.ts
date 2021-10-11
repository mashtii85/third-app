export interface TaxonomyDeleteProps {
  taxonomyId?: number
  type?: string | string[]
  entity?: string
  entityId?: number
  clientId?: number
  onSuccess: () => void
}
