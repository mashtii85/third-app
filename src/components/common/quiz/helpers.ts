import { QuizState } from './types'

export const calculateScore = (state: QuizState) => {
  let score = state.overAllScore
  const activeQuestion = state.questions[state.activeQuestionIndex]
  activeQuestion.correctAnswers.forEach((item) => {
    if (state.selectedAnswers.indexOf(item) !== -1) {
      score++
    }
  })
  return score
}
