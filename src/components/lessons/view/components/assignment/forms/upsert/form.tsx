/**
 * Components - Lessons - Questions - Forms - Answers
 */

// React Hook Form
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

// Hooks
import { useCreateTaxonomy } from '../../../../../../taxonomies/hooks'
import { useUpdateTaxonomy } from '../../../../../../taxonomies/hooks/useUpdate/useUpdate'

// UI
import { Checkbox, FormField, Form, FormLabel } from '@drykiss/industry-ui'
import { AnswersSchema as schema } from './schema'

// Types
import { AnswerFormType, AssignmentAnswerSubmitType, CheckboxDataType } from './types.d'
import { UseCreateTaxonomyProps } from '../../../../../../taxonomies/hooks/useCreate/types.d'
import { UseUpdateTaxonomyProps } from '../../../../../../taxonomies/hooks/useUpdate/types.d'
import { Taxonomy } from '../../../../../../../types/taxonomy.d'
import { MEDIUM_TYPE } from '../../../../../../../types/medium.d'

export const AssignmentAnswerForm = ({ defaultValues, onSuccess }: AnswerFormType) => {
  const { control, errors, handleSubmit, register } = useForm({
    defaultValues,
    resolver: yupResolver(schema)
  })

  const createTaxonomyProps: UseCreateTaxonomyProps = {
    clientId: defaultValues.client_id,
    category: defaultValues.type,
    entity: defaultValues.entity,
    entityId: defaultValues.entity_id,
    isParent: !!defaultValues.parent_id,
    meta: defaultValues.meta,
    onCompleted: onSuccess,
    onError: console.error
  }
  const { createTaxonomy } = useCreateTaxonomy(createTaxonomyProps)

  const updateTaxonomyProps: UseUpdateTaxonomyProps = {
    onCompleted: onSuccess,
    onError: console.error
  }
  const { updateTaxonomy } = useUpdateTaxonomy(updateTaxonomyProps)

  const submit = async (form: AssignmentAnswerSubmitType) => {
    form.meta.type = defaultValues.meta.type
    if (defaultValues.id) {
      const obj: Partial<Taxonomy> = { meta: form.meta }
      await updateTaxonomy({ variables: { taxonomyId: defaultValues.id, changes: obj } })
    } else {
      defaultValues.meta = form.meta
      await createTaxonomy({ variables: { objects: defaultValues } })
    }
    onSuccess()
  }

  const defaultOptions = { control, errors, register }

  const answerTypes = (): CheckboxDataType[] => {
    const result = Object.keys(MEDIUM_TYPE).map((key) => ({
      label: key,
      value: MEDIUM_TYPE[key as keyof typeof MEDIUM_TYPE]
    }))
    return result
  }

  return (
    <Form id="offCanvasForm" handleSubmit={handleSubmit(submit)}>
      <FormLabel label="Types">
        <Checkbox {...defaultOptions} name="meta.answer_types" data={answerTypes()} />
      </FormLabel>
      <FormLabel label="Score">
        <FormField {...defaultOptions} name="meta.score" />
      </FormLabel>
    </Form>
  )
}
