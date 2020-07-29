import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import express, { Request, Response, Router } from 'express';
import jwt from 'jsonwebtoken';
import { Document } from 'mongoose';
import { SignUpMongooseModelPost } from '../models';
import { loginSchema, signUpSchema } from '../validation';
import { LoginSchema } from '../validation/loginSchema';
import { QuizHistory } from '../validation/quizHistorySchema';
import { SignUpSchema } from '../validation/signUpSchema';

dotenv.config();

const postRouter: Router = express.Router();

export interface SignUpResponse {
  nickName: string;
  email: string;
  quizHistory: QuizHistory[] | [];
  token: string;
}

export interface MongoSignUpResponse {
  nickName: string;
  email: string;
  quizHistory: QuizHistory[] | [];
  _id: number;
  __v: number;
  password: string;
}

postRouter.post(
  '/sign-up',
  async (req: Request<any, SignUpResponse, SignUpSchema, any>, res: Response<SignUpResponse | string>) => {
    try {
      const isValid: boolean = await signUpSchema.isValid(req.body);
      if (isValid) {
        const { email, nickName, password } = req.body;
        const isUserExist: boolean = (await SignUpMongooseModelPost.find({ email }).countDocuments()) > 0;
        if (!isUserExist) {
          const salt: string = await bcrypt.genSalt(Number(process.env.SALT_NUMBER));
          const hashPassword: string = await bcrypt.hash(password as string, salt);
          const newUserDetails = {
            nickName,
            email,
            password: hashPassword,
            quizHistory: [],
          };
          const newUserSaveToMongo: Document = new SignUpMongooseModelPost(newUserDetails);
          newUserSaveToMongo.save().then((response: MongoSignUpResponse & any) => {
            const token: string = jwt.sign({ id: response._id }, process.env.JWT_ACCESS_TOKEN as string, {
              expiresIn: '60m',
            });
            const newUserResponse: SignUpResponse = {
              nickName: response.nickName,
              email: response.email,
              quizHistory: response.quizHistory,
              token,
            };
            res.json(newUserResponse);
          });
        } else {
          res.send('User exist. Try with different email.');
        }
      }
    } catch (err) {
      console.warn(err);
    }
  },
);

postRouter.post(
  '/login',
  async (req: Request<any, SignUpResponse, LoginSchema, any>, res: Response<SignUpResponse | string>) => {
    try {
      const isValid: boolean = await loginSchema.isValid(req.body);
      if (isValid) {
        const { email, password } = req.body;
        const user: any = await SignUpMongooseModelPost.findOne({ email });
        if (user === null) res.send('Wrong email or password.');
        const isValidPassword: boolean = await bcrypt.compare(password as string, user.password as string);
        if (isValidPassword) {
          const token: string = jwt.sign({ id: user._id }, process.env.JWT_ACCESS_TOKEN as string, {
            expiresIn: '60m',
          });
          const userDetails: SignUpResponse = {
            nickName: user.nickName,
            email: user.email,
            quizHistory: user.quizHistory,
            token,
          };
          res.json(userDetails);
        } else {
          res.send('Invalid password');
        }
      }
    } catch (err) {
      console.warn(err);
    }
  },
);

export { postRouter };
