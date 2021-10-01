/**
 * Components - Lessons - View - Client - Tabs - Details
 */

// React
import { MouseEvent, useContext } from 'react'

// UI
import { Button, Details2, Space, Row, Column, OffCanvasContext } from '@drykiss/industry-ui'

// Types
import { Module } from '../../../../../types/module.d'
import { STATUS_ACTIVE } from '../../../../../types/select.d'
import { ModuleFormType } from '../../../../module/forms/create/types.d'
import { ModuleFilter } from '../../../../module/hooks/useModule/types.d'

// Hooks
import { useModule } from '../../../../module/hooks/useModule/useModue'

import { LessonTable } from '../../../../lessons/lists/table/table'

// Helpers
import { Toolbar } from '../../../../lessons/lists/table/helpers'

// Forms
import { ModuleForm } from '../../../../module/forms/create/form'
import { offCanvasType } from '../../../../../types/offCanvas'

export const ClientLessons = ({ courseId }: { courseId: number }) => {
  const offCanvas = useContext<offCanvasType>(OffCanvasContext)
  const filters: Partial<ModuleFilter> = { courseId }
  const { modules, loading, error } = useModule(filters)
  if (error) {
    console.error(error.message)
  }
  if (loading) {
    console.log('loading')
  }

  const handleClick = (e: MouseEvent<HTMLButtonElement>): void => {
    e.stopPropagation()
    const defaultValues: ModuleFormType = {
      id: undefined,
      courseId: courseId,
      title: '',
      description: undefined,
      ordering: undefined,
      status: STATUS_ACTIVE.Active
    }
    offCanvas.show({
      content: <ModuleForm onSuccess={offCanvas.close} defaultValues={defaultValues} />,
      submit: true,
      title: 'Add a module'
    })
  }

  return (
    <Row>
      <Column md="5">
        {modules?.map((module: Module) => (
          <>
            <Space />
            <Details2
              open
              key={module.id}
              title={module.title}
              toolbar={
                <Toolbar
                  id={module.id}
                  courseId={courseId}
                  title={module.title}
                  status={module.status}
                  description={module.description}
                  ordering={module.ordering}
                />
              }
            >
              <LessonTable courseId={courseId} moduleId={module.id} />
            </Details2>
          </>
        ))}
        <Space />
        <Button content="Create a module" context="secondary" onClick={handleClick} />
      </Column>
      <Column md="7"></Column>
    </Row>
  )
}
