import dotenv from 'dotenv';
import express, { Router } from 'express';
import { authenticateToken } from '../helper';
import { SignUpMongooseModelPost } from '../models';

dotenv.config();

const getRouter: Router = express.Router();

getRouter.get('/user', authenticateToken, async (req: any, res) => {
  try {
    const userDataFromMongo: any = await SignUpMongooseModelPost.findOne({ _id: req.user.id });
    if (userDataFromMongo !== null) {
      const userData = {
        quizHistory: userDataFromMongo.quizHistory,
      };
      res.json(userData);
    } else {
      res.send('Not getting user data');
    }
  } catch (err) {
    res.send(err);
  }
});

export { getRouter };
