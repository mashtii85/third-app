import { QuizState } from './types'

export const calculateScore = (state: QuizState): number => {
  let score = state.overAllScore
  const activeQuestion = state.questions[state.activeQuestionIndex]
  const correctAnswers = activeQuestion?.taxonomies?.filter((taxonomy) => taxonomy.meta?.is_correct)
  const eachAnswerScore = activeQuestion.meta?.score / correctAnswers?.length ?? 1
  correctAnswers?.forEach((item) => {
    if (state.selectedAnswers.indexOf(item.id) !== -1) {
      score += eachAnswerScore
    }
  })
  return score
}
