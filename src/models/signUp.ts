import mongoose from 'mongoose';
import { QuizHistory } from '../validation/quizHistorySchema';

export interface SignUpMongo {
  password: string;
  email: string;
  nickName: string;
  quizHistory: QuizHistory[] | null;
}

const SignUpSchemaMongo: mongoose.Schema<SignUpMongo> = new mongoose.Schema(
  {
    nickName: String,
    email: String,
    password: String,
    quizHistory: [
      {
        date: String,
        correctAnswer: Number,
        totalQuestion: Number,
        title: String,
        type: String,
      },
    ],
  },
  { typeKey: '$type' },
);

const SignUpMongooseModelPost: mongoose.Model<mongoose.Document, {}> = mongoose.model(
  'izsk-quizzes',
  SignUpSchemaMongo,
);

export { SignUpMongooseModelPost };
