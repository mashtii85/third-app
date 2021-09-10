import { QUESTION_TYPE } from '../../../types/lesson.d'
import { QuizState } from './types'

export const calculateScore = (state: QuizState) => {
  let score = state.overAllScore
  const activeQuestion = state.questions[state.activeQuestionIndex]
  if (activeQuestion.type === QUESTION_TYPE.SelectAnswer) {
    activeQuestion.correctAnswers.forEach((item) => {
      if (state.selectedAnswers.indexOf(item) !== -1) {
        score++
      }
    })
  } else if (activeQuestion.type === QUESTION_TYPE.ShortTextAnswer) {
    if (
      activeQuestion.acceptableAnswers
        .map((item) => item.toLowerCase())
        .indexOf(state.shortAnsweredText.toLowerCase()) !== -1
    ) {
      score++
    }
  } else {
    throw Error('please implement new question type in calculate score')
  }

  return score
}
