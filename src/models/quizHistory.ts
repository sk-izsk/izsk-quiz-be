import mongoose from 'mongoose';
import { QuizHistory } from '../validation/quizHistorySchema';

const QuizHistorySchemaMongo: mongoose.Schema<QuizHistory> = new mongoose.Schema({
  quizHistory: {
    date: Date,
    correctAnswer: Number,
    totalQuestion: Number,
    title: String,
    type: String,
  },
});

const QuizHistoryMongooseModelPut: mongoose.Model<mongoose.Document, {}> = mongoose.model(
  'izsk-quiz',
  QuizHistorySchemaMongo,
);

export { QuizHistoryMongooseModelPut };
