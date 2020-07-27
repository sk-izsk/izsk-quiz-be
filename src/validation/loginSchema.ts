import * as yup from 'yup';
import { stringSchema } from '.';
import { emailSchema } from './common';
export interface LoginSchema {
  email: string;
  password: string;
}

const loginSchema = yup.object<LoginSchema>().shape({
  email: emailSchema.required('Email is required'),
  password: stringSchema.required('Password is required'),
});

export { loginSchema };
