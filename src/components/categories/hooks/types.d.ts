import { ApolloError } from '@apollo/client'
import { UseHookOutput } from '../../../types/hook'

// useCreateTaxonomy
export interface UseCreateTaxonomyProps {
  taxonomyId?: number
  category: string
  onCompleted: (data: { insert_taxonomy }) => void
  onError: (data: ApolloError) => void
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
