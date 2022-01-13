/**
 * Components - Courses - Form - Upsert - Schema
 */

import { LooseObject } from '../../../../types/object'

export const prepareFormParams = (formParams: LooseObject): LooseObject => {
  delete formParams.enrolled
  delete formParams.actions
  delete formParams.author
  delete formParams.type
  delete formParams.modules
  delete formParams.media
  delete formParams.__typename
  delete formParams.course_enrollments
  return formParams
}
