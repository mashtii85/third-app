/**
 * Types - Lesson
 */

import { Medium } from './medium'
import { LessonProgress } from './lessonProgress'
import { Video } from '../components/common/videoPlayer/type'

export enum LESSON_TYPE {
  Text = 'text',
  Video = 'video',
  Quiz = 'quiz',
  Assignment = 'assignment'
}

export enum LESSON_STATUS {
  Active = 'active',
  Inactive = 'inactive'
}

/* eslint-disable camelcase */
type VideoLesson = {
  id: number
  client_id: number
  type: LESSON_TYPE.Video
  title: string
  description?: string
  content: string
  media: Medium[]
  ordering?: number
  status: LESSON_STATUS
  lesson_progresses: LessonProgress[]
}

export enum QUESTION_TYPE {
  SelectAnswer = 'selectAnswer',
  ShortTextAnswer = 'shortTextAnswer'
}

type SelectAnswer = {
  type: QUESTION_TYPE.SelectAnswer
  questionText: string
  questionImage?: string
  questionVideos?: Video[]
  answers: {
    answerText?: string
    answerImage?: string
  }[]
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

type QuizLesson = {
  id: number
  client_id: number
  type: LESSON_TYPE.Quiz
  questions: QuizQuestion[]
  title: string
  description?: string
  content: string
  media?: Medium[]
  ordering?: number
  status: LESSON_STATUS
  lesson_progresses: LessonProgress[]
}

// separate these lessons when ever properties differ, like VideoLesson
// VideoLesson is separated because it's media property is not optional
type OtherLessons = {
  id: number
  client_id: number
  type: LESSON_TYPE.Text | LESSON_TYPE.Assignment
  title: string
  description?: string
  content: string
  media?: Medium[]
  ordering?: number
  status: LESSON_STATUS
  lesson_progresses: LessonProgress[]
}

export type Lesson = VideoLesson | OtherLessons | QuizLesson
