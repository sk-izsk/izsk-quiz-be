import * as yup from 'yup';
import { stringSchema } from '.';
import { emailSchema } from './common';
export interface SignUpSchema {
  email: string;
  password: string;
  nickName: string;
  confirmPassword: string;
}

const signUpSchema = yup.object<SignUpSchema>().shape({
  email: emailSchema.required('Email is required'),
  password: stringSchema.required('Password is required'),
  nickName: stringSchema.required('Nick name is required'),
  confirmPassword: stringSchema.oneOf([yup.ref('password'), undefined], 'Passwords must match'),
});

export { signUpSchema };
