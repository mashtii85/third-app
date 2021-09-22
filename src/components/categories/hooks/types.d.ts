import { ApolloError } from '@apollo/client'
import { UseHookOutput } from '../../../types/hook'
import { LooseObject } from '../../../types/object'
import { Taxonomy } from '../../../types/taxonomy'

export interface UseTaxonomiesVariable extends LooseObject {
  category?: string | string[]
  parentId?: number
  parent_id?: number
}

export interface TaxonomiesData {
  taxonomies: Taxonomy[]
}

// useCreateTaxonomy
export interface UseCreateTaxonomyProps {
  parentId: number
  isParent: boolean
  taxonomyId?: number
  category: string
  onCompleted: (data: { insert_taxonomy }) => void
  onError: (data: ApolloError) => void
}

export interface UseTaxonomiesOutput extends UseHookOutput {
  loading: boolean
  error?: any
  taxonomies: Taxonomy[]
}

export interface UseCreateTaxonomyOutput extends UseHookOutput {
  createTaxonomy: any
}

// useDeleteTaxonomy
export interface UseDeleteTaxonomyProps {
  taxonomyId?: number
  category: string | string[]
  onCompleted: (data: { delete_taxonomy_by_pk }) => void
  onError: (data: ApolloError) => void
}

export interface UseDeleteTaxonomyOutput extends UseHookOutput {
  deleteTaxonomy: any
}
