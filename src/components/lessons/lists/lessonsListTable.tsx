/**
 * Components - Lessonss - Lists
 */

// UI
import { Details2, Space, Table, formatTime, formatDateStandard } from '@drykiss/industry-ui'

// Types
import { Course } from '../../../types/course'
import { Module } from '../../../types/module'
import { Lesson } from '../../../types/lesson'

export const LessonsListTable = ({ course }: { course: Course }) => {
  const columns = [{ text: 'Id' }, { text: 'Title' }, { text: 'Status' }, { text: 'Date' }]

  const rows = (lessons?: Lesson[]) => {
    const result = lessons?.map((lesson: Lesson) => {
      return {
        Id: lesson.id,
        Title: lesson.title,
        Status: lesson.status,
        Date: `${formatDateStandard(lesson.updated_at)}
          ${formatTime(lesson.updated_at)}`
      }
    })
    return result
  }

  return (
    <>
      {course?.modules?.length &&
        course?.modules?.map((module: Module) => (
          <>
            <Space />
            <Details2 open key={module.id} title={module.title}>
              <Table
                key={`lesson-table-${module.id}`}
                columns={columns}
                rows={rows(module.lessons)}
                striped={false}
              />
            </Details2>
          </>
        ))}
    </>
  )
}
