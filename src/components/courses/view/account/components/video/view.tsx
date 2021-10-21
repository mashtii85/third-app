/**
 * Components - Cources - View - Account - Components - Document
 */

// UI
import VideoPlayer from '../../../../../common/videoPlayer/videoPlayer'

// Helpers
import { parseVideos } from '../../../../helpers'

// Types
import { Medium } from '../../../../../../types/medium.d'

export const CourseLessonVideo = ({ media }: { media: Medium[] }) => {
  return <>{media ? <VideoPlayer videos={parseVideos(media)} /> : 'No Video'}</>
}
