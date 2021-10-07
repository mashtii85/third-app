/**
 * Components - Module - Hooks - useModule
 */

// Apollo
import { useQuery } from '@apollo/client'
import { GET_MODULES } from '../../queries/queries'
import { ModuleDataList, ModuleFilter } from './types'

// Utils
import { generateWhereClause } from '../../../../utils/whereClause'

export const useModule = (filters: Partial<ModuleFilter>) => {
  const where = generateWhereClause(filters)
  const { data, error, loading, refetch } = useQuery<ModuleDataList>(GET_MODULES, {
    variables: { where }
  })

  if (error) {
    return { loading: false, error, moduleList: [] }
  }

  return { loading, modules: data?.module || [], refetch }
}
