import express, { Router } from 'express';
import { authenticateToken } from '../helper';
import { SignUpMongooseModelPost } from '../models';
import { quizHistorySchema } from '../validation';

const putRouter: Router = express.Router();

putRouter.put('/quiz-history', authenticateToken, async (req: any, res) => {
  try {
    const quizHistoryPayload = {
      date: req.body.date,
      correctAnswer: req.body.correctAnswer,
      totalQuestion: req.body.totalQuestion,
      title: req.body.title,
      type: req.body.type,
    };
    const isValid: boolean = await quizHistorySchema.isValid(quizHistoryPayload);
    if (isValid) {
      const response = await SignUpMongooseModelPost.updateOne(
        { _id: req.user.id },
        {
          $push: {
            quizHistory: quizHistoryPayload,
          },
        },
      ).catch((err) => res.send(err));
      res.send(response);
    } else {
      res.send('Wrong data format');
    }
  } catch (err) {
    res.send(err);
  }
});

export { putRouter };
