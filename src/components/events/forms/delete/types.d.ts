/**
 * Components - Events - Forms - Delete - Types.d
 */

export interface DeleteEventProps {
  accountId: number
  eventId: number
  filters: any
  title: string
  onSuccess: () => void
}
