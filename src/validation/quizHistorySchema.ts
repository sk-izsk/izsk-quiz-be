import * as yup from 'yup';
import { numberSchema, stringSchema } from '.';

export interface QuizHistory {
  date?: Date | string;
  correctAnswer?: number;
  totalQuestion?: number;
  title?: string;
  type?: string;
}

export interface QuizHistorySchema {
  quizHistory: QuizHistory[];
}

const quizHistorySchema = yup.object<QuizHistorySchema>().shape({
  quizHistory: yup.array().of(
    yup.object().shape({
      date: stringSchema,
      correctAnswer: numberSchema,
      totalQuestion: numberSchema,
      title: stringSchema,
      type: stringSchema,
    }),
  ),
});

export { quizHistorySchema };
