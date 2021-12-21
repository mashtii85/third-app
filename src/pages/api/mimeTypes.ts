/**
 * Mime Types
 *
 */

export const getMimeType = (ext: string): string | boolean => {
  switch (ext.toLowerCase()) {
    case 'srt':
    case 'vtt':
      return 'text/plain'
    default:
      return false
  }
}
