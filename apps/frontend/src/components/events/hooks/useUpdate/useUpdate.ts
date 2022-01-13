/**
 * Components - Events - List - Table - Hooks - useDeleteCourse - useDeleteCourse
 */

// Apollo
import { useMutation } from '@apollo/client'
import { UPDATE_EVENT } from '../../queries'

// Types
import { EventUpdateData, EventUpdateVariables, UseUpdateEventOutput } from './types'
import { UseHookProps } from '../../../../types/hook'

export const useUpdateEvent = (props: UseHookProps<EventUpdateData>): UseUpdateEventOutput => {
  const [updateEvent, { loading, error }] = useMutation<EventUpdateData, EventUpdateVariables>(
    UPDATE_EVENT,
    {
      onCompleted: props.onCompleted,
      onError: props.onError
    }
  )
  return { error, loading, updateEvent }
}
