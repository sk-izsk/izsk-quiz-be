import * as yup from 'yup';
import { stringSchema } from '.';
import { emailSchema } from './common';
export interface LoginSchema {
  email: string;
  password: string;
}

const loginSchema: yup.ObjectSchema<yup.Shape<
  LoginSchema | undefined,
  {
    email: string | undefined;
    password: string | undefined;
  }
>> = yup.object<LoginSchema>().shape({
  email: emailSchema,
  password: stringSchema,
});

export { loginSchema };
