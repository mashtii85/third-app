/**
 * Types - PieChart
 */

export interface IPieChart {
  id: number
  label: string
  status: string
}

export interface IChartData {
  id: number
  label: string
  value: number
}

export interface IChartModel {
  data: IChartData[]
  status: {
    started?: number
    pending?: number
    completed?: number
    total?: number
  }
}
