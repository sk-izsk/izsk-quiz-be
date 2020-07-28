import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

const authenticateToken = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers['authorization']?.split(' ')[1];
    if (token == null) return res.sendStatus(403);

    const verified = jwt.verify(token, process.env.JWT_ACCESS_TOKEN as string);
    //@ts-ignore
    req.user = verified;
    next();
  } catch (err) {
    console.warn(err);
  }
};

export { authenticateToken };
