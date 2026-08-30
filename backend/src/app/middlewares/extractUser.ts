import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload, Secret } from 'jsonwebtoken';
import config from '../../config';

export const extractUser = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization;
    if (token) {
      const verifiedUser = jwt.verify(token, config.jwt.secret as Secret) as JwtPayload;
      req.user = verifiedUser;
    }
    next();
  } catch (error) {
    next();
  }
};
