/**
 * Types - ProgressBar
 */

export interface ProgressBarData {
  id: number
  label: string
  value: number
}

export interface ProgressBarModel {
  data: ProgressBarData[]
  status: {
    started?: number
    pending?: number
    completed?: number
    total?: number
  }
}
