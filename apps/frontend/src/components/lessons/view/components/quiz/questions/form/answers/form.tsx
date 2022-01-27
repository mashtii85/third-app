/**
 * Components - Lessons - Questions - Forms - Answers
 */

// React
import { Fragment, useEffect } from 'react'

// React Hook Form
import { useFieldArray, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

// Hooks
import { useCreateTaxonomy } from '../../../../../../../taxonomies/hooks'
import { useDeleteAnswers } from '../../hooks/useDelete/useDelete'
import { useCurrentUser } from '../../../../../../../../utils/useCurrentUser'

// UI
import { Checkbox, Form, Input, Column, Label, LazyIcon, Row } from '@drykiss/industry-ui'
import { AnswersSchema as schema } from './schema'

// Types
import {
  AnswerFormType,
  AnswersSubmitType,
  FieldType,
  QUIZ_QUESTION_TYPE,
  Taxonomy,
  UseCreateTaxonomyProps,
  UseDeleteAnswerProps
} from '@availabletowork/types'

//Constants
import { STATUS_ACTIVE } from '@availabletowork/types'

export const AnswerForm = ({ filters, defaultValues, onSuccess }: AnswerFormType) => {
  const { user } = useCurrentUser()

  const {
    control,
    formState: { errors = {} },
    handleSubmit,
    register,
    setValue
  } = useForm({
    defaultValues,
    resolver: yupResolver(schema)
  })

  // eslint-disable-next-line
  // @ts-ignore
  const { fields, append, remove } = useFieldArray({ control, name: 'answers' })

  const fieldList: Partial<FieldType>[] | undefined = defaultValues?.map((answer) => {
    const result: Partial<FieldType> = { name: answer.name, isCorrect: answer?.meta?.is_correct }
    return result
  })

  useEffect(() => {
    if (defaultValues && defaultValues.length) {
      // eslint-disable-next-line no-use-before-define
      // @ts-ignore
      setValue('answers', fieldList) // eslint-disable-line
    }
  }, [])

  const createTaxonomyProps: UseCreateTaxonomyProps = {
    category: filters?.type,
    entity: filters?.entity,
    entityId: filters?.entity_id,
    parentId: filters?.parent_id,
    isParent: !!filters?.parent_id,
    onCompleted: onSuccess,
    onError: console.error
  }
  const { createTaxonomy } = useCreateTaxonomy(createTaxonomyProps)

  const taxonomiesVariable: Partial<UseDeleteAnswerProps> = {
    parentId: filters.parent_id,
    onCompleted: onSuccess,
    onError: console.error
  }
  const { deleteAnswer } = useDeleteAnswers(taxonomiesVariable)

  const handleCheckedChange = (index: number) => {
    switch (filters?.meta?.type) {
      case QUIZ_QUESTION_TYPE.SingleAnswer:
        // eslint-disable
        // @ts-ignore
        for (let i = 0; i < fields?.length; i++) setValue(`answers[${i}].isCorrect`, false)
        // eslint-disable-next-line
        // @ts-ignore
        setValue(`answers[${index}].isCorrect`, true)
        break
      case QUIZ_QUESTION_TYPE.MultipleAnswers:
      default:
        break
    }
  }

  const submit = async ({ answers }: AnswersSubmitType) => {
    console.log('answers', answers)
    const variables = { where: { parent_id: { _eq: filters.parent_id } } }
    await deleteAnswer({ variables })

    const newAnswers: Partial<Taxonomy>[] = answers
      ?.filter((valueObj) => valueObj.name)
      ?.map((valueObj) => {
        const answer: Partial<Taxonomy> = {
          client_id: user.client_id,
          parent_id: filters.parent_id,
          entity: filters.entity,
          entity_id: filters.entity_id,
          name: valueObj?.name,
          type: filters?.type,
          status: STATUS_ACTIVE.Active,
          meta: { is_correct: valueObj.isCorrect }
        }
        return answer
      })
    if (newAnswers && newAnswers.length)
      await createTaxonomy({ variables: { objects: newAnswers } })
  }

  const defaultOptions = { control, errors, register, showError: true }
  return (
    <>
      <Form id="offCanvasForm" handleSubmit={handleSubmit(submit)}>
        <Row>
          <Column xs={10} md={11}>
            <Label label="Answer Options">
              {filters?.meta?.type === QUIZ_QUESTION_TYPE.SingleAnswer && <>Single Answer</>}
              {filters?.meta?.type === QUIZ_QUESTION_TYPE.MultipleAnswers && <>Multiple Answers</>}
            </Label>
          </Column>

          <Column>
            <LazyIcon iconName="plus" onClick={() => append({ value: '', isCorrect: false })} />
          </Column>
        </Row>

        <>
          {fields?.map((field, index) => {
            return (
              <>
                <Fragment key={field.id}>
                  <Label label={`Option ${index + 1}`}>
                    <Row align="center">
                      <Column xs={10} md={11}>
                        <Row>
                          <Column md={1}>
                            <Checkbox
                              key={field.id}
                              {...defaultOptions}
                              // eslint-disable-next-line
                              // @ts-ignore
                              defaultChecked={field.isCorrect}
                              name={`answers[${index}].isCorrect`}
                              data={[{}]}
                              onChange={() => handleCheckedChange(index)}
                            />
                          </Column>
                          <Column md={11}>
                            <Input
                              key={field.id}
                              {...defaultOptions}
                              // eslint-disable-next-line
                              // @ts-ignore
                              defaultValue={field.name}
                              name={`answers[${index}].name`}
                            />
                          </Column>
                        </Row>
                      </Column>
                      <Column>
                        <LazyIcon iconName="delete" onClick={() => remove(index)} size="sm" />
                      </Column>
                    </Row>
                  </Label>
                </Fragment>
              </>
            )
          })}
        </>
      </Form>
    </>
  )
}
