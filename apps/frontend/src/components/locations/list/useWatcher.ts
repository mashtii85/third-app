import { useEffect } from 'react'
import { LooseObject } from '../../../types/object'
import { STATUS_ACTIVE } from '../../../types/select.d'
import { historyPush } from '../../../utils/historyPush'

export const useWatcher = (
  setFilters: (data: any) => void,
  watch: () => LooseObject,
  values: LooseObject
): void => {
  const { ...list } = values
  delete list.query
  const watchList = JSON.stringify(values)

  useEffect(() => {
    watch()
    const { taxonomy, status, ...other } = list
    const queryStringer = other
    if (taxonomy) {
      queryStringer.type = taxonomy.value
    }
    if (status !== STATUS_ACTIVE.Active) {
      queryStringer.status = status
    } else {
      queryStringer.status = null
    }
    setFilters((p: any) => ({ ...p, taxonomy: values.taxonomy || null, status: values.status }))
    historyPush(queryStringer)
  }, [watchList])
}
