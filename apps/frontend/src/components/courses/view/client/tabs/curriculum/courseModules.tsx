/**
 * Components - Course - View - Client - Tabs - Curriculum - CourseModules
 */

// React
import { MouseEvent, useContext } from 'react'

// Hooks
import { useModule } from '../../../../../module/hooks/useModule/useModule'

// UI
import { Button, Details, Space, Row, Column, OffCanvasContext } from '@drykiss/industry-ui'
import { LessonTable } from '../../../../../lessons/lists/table/table'
import { ModuleForm } from '../../../../../module/forms/create/form'

// Helpers
import { Toolbar } from './helpers'
import { CourseModuleOrderingHelper } from './orderingHelper'

// Types
import {
  Module,
  ModuleFilter,
  ModuleFormType,
  offCanvasType,
  STATUS_ACTIVE
} from '@availabletowork/types'

export const ClientCourseModule = ({ courseId }: { courseId: number }) => {
  const offCanvas = useContext<offCanvasType>(OffCanvasContext)

  const filters: Partial<ModuleFilter> = { courseId }
  const { modules, refetch } = useModule(filters)

  // correcting the ordering fields if found a problem
  const sortedModules = CourseModuleOrderingHelper(modules)

  const handleClick = (e: MouseEvent<HTMLButtonElement>): void => {
    e.stopPropagation()
    const ordering =
      sortedModules && sortedModules.length > 0
        ? sortedModules[sortedModules.length - 1].ordering + 1
        : undefined

    const defaultValues: ModuleFormType = {
      id: undefined,
      courseId: courseId,
      title: '',
      description: undefined,
      ordering,
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
      <Column md="6">
        {sortedModules?.map((module: Module) => (
          <>
            <Space key={`space-${module.id}`} />
            <Details
              open
              key={`details-${module.id}`}
              title={module.title}
              toolbar={
                <Toolbar
                  key={`toolbar-${module.id}`}
                  id={module.id}
                  courseId={courseId}
                  title={module.title}
                  status={module.status}
                  description={module.description}
                  ordering={module.ordering}
                  modules={sortedModules}
                  lessons={module.lessons}
                  onChanged={refetch}
                />
              }
            >
              <LessonTable
                key={`table-${module.id}`}
                courseId={courseId}
                moduleId={module.id}
                lessons={module.lessons}
                onChanged={refetch}
              />
            </Details>
          </>
        ))}
        <Space />
        <Button content="Create a module" context="secondary" onClick={handleClick} />
      </Column>
    </Row>
  )
}
