/**
 * Components - Users - View - Upsert - Types.d
 */

// Types
import { UserMeta } from '../../../../../types/user'

export interface NotificationSettingsProps {
  userMeta: Partial<UserMeta>
  userId: number
  onSuccess: () => void
}
