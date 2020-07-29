import express, { Router } from 'express';
import { authenticateToken } from '../helper';
import { SignUpMongooseModelPost } from '../models';
import { quizHistorySchema } from '../validation';

const putRouter: Router = express.Router();

putRouter.put('/quiz-history', authenticateToken, async (req: any, res) => {
  try {
    // console.log('this is req', req);
    const quizHistoryPayload = {
      date: req.body.date,
      correctAnswer: req.body.correctAnswer,
      totalQuestion: req.body.totalQuestion,
      title: req.body.title,
      type: req.body.type,
    };
    const validatedQuizHistoryPayload = await quizHistorySchema.validate(quizHistoryPayload);
    const response = await SignUpMongooseModelPost.updateOne(
      { _id: req.user.id },
      {
        $push: {
          quizHistory: validatedQuizHistoryPayload,
        },
      },
    ).catch((err) => res.send(err));
    res.send(response);
    console.log('this is validated quiz history', validatedQuizHistoryPayload);
  } catch (err) {
    res.send(err);
  }
});

export { putRouter };
