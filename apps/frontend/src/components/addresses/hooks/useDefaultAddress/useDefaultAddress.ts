/**
 * Components - Addresses - Hooks - useDefaultAddress
 */

// Apollo
import { useMutation } from '@apollo/client'
import { SET_DEFAULT_ADDRESS } from '../../queries/queries'

// Types
import {
  DefaultAddressHookProps,
  UseDefaultAddressOutput,
  UseHookProps
} from '@availabletowork/types'

export const useDefaultAddress = (
  props: UseHookProps<DefaultAddressHookProps>
): UseDefaultAddressOutput => {
  const [defaultAddress, { loading, error }] = useMutation<DefaultAddressHookProps>(
    SET_DEFAULT_ADDRESS,
    {
      onCompleted: props.onCompleted,
      onError: props.onError
    }
  )
  return { loading, error, defaultAddress }
}
