/**
 * Types - Base Types
 */

export interface Entity {
  id: number
}

export interface Sortable extends Entity {
  ordering?: number
}
