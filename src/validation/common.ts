import * as yup from 'yup';

const stringSchema: yup.StringSchema<string | undefined> = yup.string();
const emailSchema: yup.StringSchema<string | undefined> = yup.string().email();
const numberSchema: yup.NumberSchema<number | undefined> = yup.number();
const dateSchema: yup.DateSchema<Date | undefined> = yup.date();

export { stringSchema, emailSchema, numberSchema, dateSchema };
