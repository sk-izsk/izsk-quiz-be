import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import express, { Router } from 'express';
import jwt from 'jsonwebtoken';
import { SignUpMongooseModelPost } from '../models';
import { loginSchema, signUpSchema } from '../validation';

dotenv.config();

const postRouter: Router = express.Router();

postRouter.post('/sign-up', async (req, res) => {
  try {
    const validatedSignUpDetails = await signUpSchema.validate(req.body);
    if (validatedSignUpDetails !== undefined) {
      const { email, nickName, password } = validatedSignUpDetails;
      const isUserExist: boolean = (await SignUpMongooseModelPost.find({ email }).countDocuments()) > 0;
      if (!isUserExist) {
        const salt = await bcrypt.genSalt(Number(process.env.SALT_NUMBER));
        const hashPassword = await bcrypt.hash(password as string, salt);
        const newUserDetails = {
          nickName,
          email,
          password: hashPassword,
          quizHistory: [],
        };
        const newUserSaveToMongo = new SignUpMongooseModelPost(newUserDetails);
        newUserSaveToMongo.save().then((response: any) => {
          const token = jwt.sign({ id: response._id }, process.env.JWT_ACCESS_TOKEN as string, { expiresIn: '60m' });
          const newUserResponse = {
            nickName: response.nickName,
            email: response.email,
            quizHistory: response.quizHistory,
            token,
          };
          res.json(newUserResponse);
          console.log('this is', response);
        });
      } else {
        res.send('User exist. Try with different email.');
      }
    }
  } catch (err) {
    console.warn(err);
  }
});

postRouter.post('/login', async (req, res) => {
  try {
    const validatedLoginDetails = await loginSchema.validate(req.body);
    if (validatedLoginDetails !== undefined) {
      const { email, password } = validatedLoginDetails;
      const user: any = await SignUpMongooseModelPost.findOne({ email });
      if (user === null) res.send('Wrong email or password.');
      const isValidPassword = await bcrypt.compare(password as string, user.password as string);
      if (isValidPassword) {
        const token = jwt.sign({ id: user._id }, process.env.JWT_ACCESS_TOKEN as string, { expiresIn: '60m' });
        const userDetails = {
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
});

export { postRouter };
