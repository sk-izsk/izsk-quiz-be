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
  quizHistory: QuizHistory[] | [];
}

const quizHistorySchema: yup.ObjectSchema<yup.Shape<
  QuizHistory | undefined,
  {
    date: string | undefined;
    correctAnswer: number | undefined;
    totalQuestion: number | undefined;
    title: string | undefined;
    type: string | undefined;
  }
>> = yup.object<QuizHistory>().shape({
  date: stringSchema,
  correctAnswer: numberSchema,
  totalQuestion: numberSchema,
  title: stringSchema,
  type: stringSchema,
});

export { quizHistorySchema };
