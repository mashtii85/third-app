/**
 * Components - Course - View - Client - Tabs - Curriculum - Helpers
 */

// React
import { MouseEvent, useContext } from 'react'

// Hooks
import { useSwapModule } from '../../../../../module/hooks/useSwapModules/useSwapModules'

// UI
import { Button, ButtonToolbar, OffCanvasContext } from '@drykiss/industry-ui'
import { ModuleForm } from '../../../../../module/forms/create/form'
import { ModuleDeleteForm } from '../../../../../module/forms/delete/delete'
import { LessonForm } from '../../../../../lessons/form'

// Constants
import { SIZE, THEME_CONTEXT } from '@availabletowork/types'

// Types
import {
  LESSON_STATUS,
  LESSON_TYPE,
  LessonUpsertFormFilterType,
  ModuleFormType,
  ModuleToolbarType,
  offCanvasType,
  SwapModulesProps
} from '@availabletowork/types'

export const Toolbar = ({
  id,
  courseId,
  title,
  description,
  ordering,
  status,
  modules,
  lessons,
  onChanged
}: ModuleToolbarType) => {
  const offCanvas = useContext<offCanvasType>(OffCanvasContext)
  const { updateModule } = useSwapModule({
    onError: (error) => {
      console.error(error)
    }
  })

  const isDisabled = (up: boolean, ordering: number): boolean =>
    up ? ordering === modules[0].ordering : ordering === modules[modules.length - 1].ordering

  const handleEdit = (e: MouseEvent<HTMLElement>): void => {
    e.stopPropagation()
    const defaultValues: ModuleFormType = {
      id: id,
      courseId: courseId,
      title: title,
      description: description ?? '',
      ordering: ordering ?? 0,
      status: status
    }
    offCanvas.show({
      content: <ModuleForm onSuccess={offCanvas.close} defaultValues={defaultValues} />,
      submit: true,
      title: 'Add a module'
    })
  }

  const handleDelete = (e: MouseEvent<HTMLElement>): void => {
    e.stopPropagation()
    offCanvas.show({
      content: (
        <ModuleDeleteForm id={id} courseId={courseId} title={title} onSuccess={offCanvas.close} />
      ),
      title: 'Delete module',
      submit: false
    })
  }

  const handleArrowUp = (e: MouseEvent<HTMLElement>) => {
    e.stopPropagation()
    const selectedIndex = modules.findIndex((module) => module.id === id)
    if (selectedIndex === 0) return
    const down = modules[selectedIndex - 1]
    const up = modules[selectedIndex]
    const variables: SwapModulesProps = {
      downId: down.id,
      downOrdering: up.ordering,
      upId: up.id,
      upOrdering: down.ordering
    }
    updateModule({ variables })
  }

  const handleArrowDown = (e: MouseEvent<HTMLElement>) => {
    e.stopPropagation()
    const selectedIndex = modules.findIndex((module) => module.id === id)
    if (selectedIndex === modules.length - 1) return
    const down = modules[selectedIndex]
    const up = modules[selectedIndex + 1]
    const variables: SwapModulesProps = {
      downId: down.id,
      downOrdering: up.ordering,
      upId: up.id,
      upOrdering: down.ordering
    }
    updateModule({ variables })
  }

  const handleSuccess = () => {
    // { insert_lesson_one }: { insert_lesson_one: Lesson }
    onChanged()
    offCanvas.close()
  }

  const handleClick = (e: MouseEvent<HTMLButtonElement>): void => {
    e.stopPropagation()
    // const ordering = lessons?.find((lesson) => Math.max(lesson.ordering ?? 0))?.ordering ?? 0
    const ordering =
      lessons && lessons.length > 0 ? lessons[lessons.length - 1].ordering + 1 : undefined
    const filters: Partial<LessonUpsertFormFilterType> = { courseId: courseId, moduleId: id }
    offCanvas.show({
      content: (
        <LessonForm
          filters={filters}
          onSuccess={handleSuccess}
          defaultValues={{
            ordering: ordering,
            type: LESSON_TYPE.Text,
            status: LESSON_STATUS.Active
          }}
        />
      ),
      submit: true,
      title: 'Add a lesson'
    })
  }

  return (
    <>
      <ButtonToolbar>
        <Button
          context={THEME_CONTEXT.secondary}
          onClick={handleEdit}
          size={SIZE.SM}
          startIcon="edit"
        />
        <Button
          context={THEME_CONTEXT.danger}
          onClick={handleDelete}
          size={SIZE.SM}
          startIcon="trash"
        />
      </ButtonToolbar>
      <ButtonToolbar>
        <Button
          context={THEME_CONTEXT.white}
          onClick={handleArrowUp}
          size={SIZE.SM}
          startIcon="arrow-up"
          disabled={isDisabled(true, ordering)}
        />
        <Button
          context={THEME_CONTEXT.white}
          onClick={handleArrowDown}
          size={SIZE.SM}
          startIcon="arrow-down"
          disabled={isDisabled(false, ordering)}
        />
      </ButtonToolbar>
      <ButtonToolbar>
        <Button
          context={THEME_CONTEXT.secondary}
          onClick={handleClick}
          size={SIZE.SM}
          // startIcon="plus"
          content="New Lesson"
        />
      </ButtonToolbar>
    </>
  )
}
