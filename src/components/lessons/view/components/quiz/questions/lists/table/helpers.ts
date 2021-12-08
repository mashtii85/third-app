/**
 * Components - Lessons - Questions - Lists - Helpers
 */

// Types
import { STATUS_ACTIVE } from '../../../../../../../../types/select.d'
import { CustomFields, Taxonomy } from '../../../../../../../../types/taxonomy'
import { LessonQuestionTableProps } from './type.d'

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
