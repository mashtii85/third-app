import { ApolloError } from '@apollo/client'

// useCreateTaxonomy
export interface UseCreateTaxonomyProps {
  taxonomyId?: number
  category: string
  onCompleted: (data: { insert_taxonomy }) => void
  onError: (data: ApolloError) => void
}

// useDeleteTaxonomy
export interface UseDeleteTaxonomyProps {
  taxonomyId?: number
  category: string
  onCompleted: (data: { delete_taxonomy_by_pk }) => void
  onError: (data: ApolloError) => void
}
