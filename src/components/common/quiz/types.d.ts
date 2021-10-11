import { QuizQuestion } from '../../../types/lesson.d'

export interface QuizCompletedData {
  score: number
  passed: boolean
}
export interface QuizProps {
  questions: QuizQuestion[]
  onComplete: ({ score, passed }: QuizCompletedData) => void
  /** default is 50 */
  minimumScoreToPass?: number
  quizScoreInfo?: QuizCompletedData
}
export interface QuizState {
  activeQuestionIndex: number
  overAllScore: number
  bestScore: number
  quizFinished: boolean
  selectedAnswers: number[]
  questions: QuizQuestion[]
  shortAnsweredText: string
  finalScore: number
}
type NextAction = { type: 'next' }
type FinishAction = { type: 'finish' }
type ResetAction = { type: 'reset'; payload: QuizState }
type SetOverAllScoreAction = { type: 'setOverAllScore'; payload: number }
type SetAnswerAction = { type: 'setAnswerAction'; payload: number }
type SetNewAnswerAction = { type: 'setNewAnswerAction'; payload: number }
type SetShortTextAnswerAction = { type: 'setShortTextAnswerAction'; payload: string }

export type QuizActionTypes =
  | NextAction
  | ResetAction
  | SetOverAllScoreAction
  | SetAnswerAction
  | FinishAction
  | SetNewAnswerAction
  | SetShortTextAnswerAction
