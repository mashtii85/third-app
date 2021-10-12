/**
 * Components - Common - Hooks - UseQueryWatcher - UseQueryWatcher
 */
// React
import { useEffect } from 'react'

// Next
import { useRouter } from 'next/router'
import { useQueryWatcherProps } from './types'

export const useQueryWatcher = ({ watcher, queryName }: useQueryWatcherProps): void => {
  const { push } = useRouter()

  const queryChangeHandler = (value?: string): void => {
    if (value) {
      push({
        search: `?${queryName}=${value}`
      })
    } else {
      push({
        search: ''
      })
    }
  }

  useEffect(() => {
    queryChangeHandler(watcher?.value)
    return (): void => {
      queryChangeHandler(watcher?.value)
    }
  }, [watcher])
}
