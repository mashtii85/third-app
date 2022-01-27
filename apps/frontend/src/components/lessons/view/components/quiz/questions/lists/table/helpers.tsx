/**
 * Components - Lessons - Questions - Lists - Helpers
 */

//Constants
import { STATUS_ACTIVE } from '@availabletowork/types'

// Types
import { CustomFields, LessonQuestionTableProps, Taxonomy } from '@availabletowork/types'

export const prepareTaxonomyDefaultValues = (
  row: Taxonomy,
  tableProps: LessonQuestionTableProps
): any => {
  const taxonomy = { ...row }
  const initialCustomFields: CustomFields = {
    input: '',
    inputType: '',
    label: '',
    required: false,
    withTime: false
  }
  const custom_fields = taxonomy.custom_fields ?? initialCustomFields
  return {
    ...taxonomy,
    entity: tableProps.entity,
    entity_id: tableProps.entityId,
    type: tableProps.type,
    status: STATUS_ACTIVE.Active,
    custom_fields
  }
}
