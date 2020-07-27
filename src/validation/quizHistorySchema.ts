import * as yup from 'yup';
import { numberSchema, stringSchema } from '.';
import { dateSchema, emailSchema } from './common';

export interface QuizHistory {
  date: Date;
  correctAnswer: number;
  totalQuestion: number;
  title: string;
  type: string;
}

export interface QuizHistorySchema {
  email: string;
  quizHistory: QuizHistory[];
}

const quizHistorySchema = yup.object<QuizHistorySchema>().shape({
  email: emailSchema.required('Email is required'),
  quizHistory: yup.array().of(
    yup.object().shape({
      date: dateSchema,
      correctAnswer: numberSchema,
      totalQuestion: numberSchema,
      title: stringSchema,
      type: stringSchema,
    }),
  ),
});

export { quizHistorySchema };
