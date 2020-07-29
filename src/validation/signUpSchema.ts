import * as yup from 'yup';
import { stringSchema } from '.';
import { emailSchema } from './common';
export interface SignUpSchema {
  email: string;
  password: string;
  nickName: string;
  confirmPassword: string;
}

const signUpSchema: yup.ObjectSchema<yup.Shape<
  SignUpSchema | undefined,
  {
    email: string | undefined;
    password: string | undefined;
    nickName: string | undefined;
    confirmPassword: undefined;
  }
>> = yup.object<SignUpSchema>().shape({
  email: emailSchema,
  password: stringSchema,
  nickName: stringSchema,
  confirmPassword: stringSchema.oneOf([yup.ref('password'), undefined], 'Passwords must match'),
});

export { signUpSchema };
