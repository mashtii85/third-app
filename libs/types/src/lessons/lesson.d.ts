/**
 * Types - Lesson
 */

// Constants
import { LESSON_TYPE, LESSON_STATUS, QUESTION_TYPE } from '@availabletowork/constants'

// Types
import { Video } from '../common'
import { Sortable } from '../general'
import { Medium } from '../media'
import { Module } from '../module'
import { Taxonomy } from '../taxonomies'
import { LessonProgress } from './lessonProgress'

type BaseLesson = Sortable & {
  course_id: number
  module_id: number
}

type VideoLesson = BaseLesson & {
  type: LESSON_TYPE.Video
  title: string
  description?: string
  content: string
  media: Medium[]
  status: LESSON_STATUS
  lesson_progresses: LessonProgress[]
  taxonomies?: Taxonomy[]
  module: Module
  created_at: Date
  updated_at: Date
}

type SelectAnswer = {
  type: QUESTION_TYPE.SelectAnswer
  questionText: string
  questionImage?: string
  questionVideos?: Video[]
  answers: Taxonomy[]
  correctAnswers: number[]
}

type ShortTextAnswer = {
  type: QUESTION_TYPE.ShortTextAnswer
  questionText: string
  questionImage?: string
  questionVideos?: Video[]
  acceptableAnswers: string[]
}

export type QuizQuestion = SelectAnswer | ShortTextAnswer

type QuizLesson = BaseLesson & {
  type: LESSON_TYPE.Quiz
  questions: QuizQuestion[]
  title: string
  description?: string
  content: string
  media?: Medium[]
  ordering?: number
  status: LESSON_STATUS
  lesson_progresses: LessonProgress[]
  module: Module
  created_at: Date
  updated_at: Date
  taxonomies: Taxonomy[]
}

// separate these lessons when ever properties differ, like VideoLesson
// VideoLesson is separated because it's media property is not optional
type OtherLessons = BaseLesson & {
  type: LESSON_TYPE.Text | LESSON_TYPE.Assignment | LESSON_TYPE.Pdf | LESSON_TYPE.PowerPoint
  title: string
  description?: string
  content: string
  media?: Medium[]
  status: LESSON_STATUS
  lesson_progresses: LessonProgress[]
  taxonomies?: Taxonomy[]
  module?: Module
  created_at: Date
  updated_at: Date
}

export type Lesson = VideoLesson | QuizLesson | OtherLessons
