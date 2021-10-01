/**
 * Components - Module - Hooks - useCreate - useCreate
 */

// Apollo
import { useMutation } from '@apollo/client'
import { CREATE_MODULE, GET_MODULES } from '../../queries/queries'

// Types
import { ModuleCreateData, UseCreateModuleOutput } from './types.d'
import { UseHookProps } from '../../../../types/hook.d'
import { ModuleFormType } from '../../forms/create/types.d'
import { Module } from '../../../../types/module.d'

export const useCreateModule = (
  courseId: number,
  props: UseHookProps<ModuleCreateData>
): UseCreateModuleOutput => {
  const [createModule, { error, loading }] = useMutation<ModuleCreateData, ModuleFormType>(
    CREATE_MODULE,
    {
      onCompleted: props.onCompleted,
      onError: props.onError,
      update(cache, { data }) {
        const variables = {
          where: { course_id: { _eq: courseId } }
        }
        const { module } = cache.readQuery<{ module: Module[] }>({
          query: GET_MODULES,
          variables
        }) || { module: [] }
        cache.writeQuery({
          query: GET_MODULES,
          variables,
          data: { module: [...module, ...(data?.module?.returning as Module[])] }
        })
      }
    }
  )
  return { error, loading, createModule }
}
