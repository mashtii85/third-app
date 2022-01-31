/**
 * Components - Lessons - Questions - Forms - Upsert
 */

// Apollo
import { useMutation } from '@apollo/client'
import { UPDATE_TAXONOMY } from '@availabletowork/queries'

// React Hook Form
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

// Hooks
import { useCreateTaxonomy } from '../../../../../../../taxonomies/hooks'
import { useCurrentUser } from '../../../../../../../../utils/useCurrentUser'

// UI
import { Form, Input, Label, Select } from '@drykiss/industry-ui'
import { QuestionUpsertSchema as schema } from './schema'

// Constants
import { QUIZ_QUESTION_TYPE } from '@availabletowork/constants'

// Types
import {
  QuestionUpsertFormType,
  QuestionUpsertType,
  Taxonomy,
  UseCreateTaxonomyProps
} from '@availabletowork/types'

export const LessonQuestionForm = ({
  filters,
  defaultValues,
  onSuccess
}: QuestionUpsertFormType) => {
  const { user } = useCurrentUser()

  const {
    control,
    formState: { errors = {} },
    handleSubmit,
    register
  } = useForm({
    defaultValues,
    resolver: yupResolver(schema)
  })

  const createTaxonomyProps: UseCreateTaxonomyProps = {
    category: filters?.type,
    entity: filters?.entity,
    entityId: filters?.entity_id,
    isParent: !!filters?.parent_id,
    onCompleted: onSuccess,
    onError: console.error
  }
  const { createTaxonomy } = useCreateTaxonomy(createTaxonomyProps)

  const [updateTaxonomy] = useMutation(UPDATE_TAXONOMY, {
    onCompleted: onSuccess
  })

  const submit = async (form: QuestionUpsertType) => {
    const obj: Partial<Taxonomy> = {
      name: form?.name,
      type: filters?.type,
      meta: form.meta
    }

    if (filters.id) {
      return await updateTaxonomy({ variables: { taxonomyId: filters.id, changes: obj } })
    } else {
      obj.client_id = user.client_id
      obj.entity = filters.entity
      obj.entity_id = filters.entity_id
      obj.status = filters?.status
      return await createTaxonomy({ variables: { objects: [obj] } })
    }
  }

  const defaultOptions = {
    control,
    errors: errors,
    register: register,
    showError: true
  }

  const questionType = [
    { disabled: true, text: 'Please choose...', value: '' },
    { text: 'Single Answer', value: QUIZ_QUESTION_TYPE.SingleAnswer },
    { text: 'Multiple Answers', value: QUIZ_QUESTION_TYPE.MultipleAnswers }
  ]

  return (
    <Form id="offCanvasForm" handleSubmit={handleSubmit(submit)}>
      <Label label="Question Type">
        <Select {...defaultOptions} name="meta.type" options={questionType} />
      </Label>

      <Label label="Question Title">
        <Input {...defaultOptions} name="name" />
      </Label>

      <Label label="Question Score">
        <Input {...defaultOptions} name="meta.score" />
      </Label>
    </Form>
  )
}
