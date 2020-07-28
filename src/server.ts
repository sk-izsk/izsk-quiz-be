import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import { postRouter } from './routes';

dotenv.config();

const PORT: number | string = process.env.PORT || 5000;

const app: express.Application = express();

app.use(express.urlencoded({ extended: false }));

app.use(express.json());

const allowedOrigins: string[] = ['http://localhost:3000'];
app.use(
  cors({
    origin: (origin: string | undefined, callback: (err: Error | null, allow?: boolean | undefined) => void) => {
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        const msg: string = 'The CORS policy for this site does not allow access from the specified Origin.';
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
  }),
);

app.use('/', postRouter);

mongoose.connect(
  process.env.MONGO_DB_TOKEN as string,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },

  (err) => {
    console.log('connected to db');
    console.log('this is mongo error', err);
  },
);

app.listen(PORT, function () {
  console.log(`App is listening on port ${PORT}!`);
});
