/**
 * Types - Lesson
 */

import { Medium } from './medium'

export enum LESSON_TYPE {
  Text = 'text',
  Video = 'video',
  Quiz = 'quiz',
  Assignment = 'assignment'
}

export enum LESSON_STATUS {
  Pending = 'pending',
  Started = 'started',
  Completed = 'completed'
}

type VideoLesson = {
  id: number
  type: LESSON_TYPE.Video
  title: string
  description?: string
  content: string
  media: Medium[]
  ordering?: number
  status: LESSON_STATUS
}

export interface QuizQuestion {
  question: string
  answers: string[]
  correctAnswers: number[]
}

type QuizLesson = {
  id: number
  type: LESSON_TYPE.Quiz
  questions: QuizQuestion[]
  title: string
  description?: string
  content: string
  media?: Medium[]
  ordering?: number
  status: LESSON_STATUS
}

// separate these lessons when ever properties differ, like VideoLesson
// VideoLesson is separated because it's media property is not optional
type OtherLessons = {
  id: number
  type: LESSON_TYPE.Text | LESSON_TYPE.Assignment
  title: string
  description?: string
  content: string
  media?: Medium[]
  ordering?: number
  status: LESSON_STATUS
}

export type Lesson = VideoLesson | OtherLessons | QuizLesson
