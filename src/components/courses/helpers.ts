/**
 * Components - Charts - Course - Helper
 */

import { IChartModel, IPieChart } from '../../types/piechart.d'

export const chartData = (data: IPieChart[]) => {
  const result: IChartModel = { data: [], status: {} }
  let started: number = 0
  let pending: number = 0
  let completed: number = 0
  const total = data.length

  data.forEach((item) => {
    if (item.status === 'started') started++
    else if (item.status === 'completed') completed++
    else pending++
  })

  result.data = [
    { id: 1, label: 'started', value: started },
    { id: 2, label: 'pending', value: pending }
  ]

  result.status = { started, pending, completed, total }

  return result
}
