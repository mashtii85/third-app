export enum ANSWER_TYPE {
  Assignment = 'assignment'
}

export enum LESSON_TYPE {
  Text = 'text',
  Video = 'video',
  Quiz = 'quiz',
  Assignment = 'assignment',
  Pdf = 'pdf',
  PowerPoint = 'powerpoint'
}

export enum LESSON_STATUS {
  Active = 'active',
  Inactive = 'inactive'
}
//
export enum QUESTION_TYPE {
  SelectAnswer = 'selectAnswer',
  ShortTextAnswer = 'shortTextAnswer'
}

export enum QUIZ_QUESTION_TYPE {
  SingleAnswer = 'singleAnswer',
  MultipleAnswers = 'multipleAnswers'
}

export enum LESSON_PROGRESS_STATUS {
  Pending = 'pending',
  Started = 'started',
  Completed = 'completed'
}
