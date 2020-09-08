import express, { Request, Response, Router } from 'express';
import { Document } from 'mongoose';
import { authenticateToken } from '../helper';
import { SignUpMongooseModelPost } from '../models';
import { QuizHistorySchema } from '../validation/quizHistorySchema';

const getRouter: Router = express.Router();

getRouter.get(
  '/user',
  authenticateToken,
  async (req: Request<any, QuizHistorySchema, any, any> & any, res: Response<QuizHistorySchema | string>) => {
    try {
      const userDataFromMongo: Document & any = await SignUpMongooseModelPost.findOne({ _id: req.user.id });
      if (userDataFromMongo !== null) {
        const userData: QuizHistorySchema = {
          quizHistory: userDataFromMongo.quizHistory,
        };
        res.json(userData);
      } else {
        res.send('Not getting user data');
      }
    } catch (err) {
      res.send(err);
    }
  },
);

export { getRouter };
