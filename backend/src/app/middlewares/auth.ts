import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import { JwtPayload, Secret } from 'jsonwebtoken';
import config from '../../config';
import ApiError from '../../errors/ApiError';
import { jwtHelpers } from '../../helpers/jwtHelpers';

const auth =
  (...requiredRoles: string[]) =>
  async (req: Request, _res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization?.split(' ')[1];
      if (!token) throw new ApiError(httpStatus.UNAUTHORIZED, 'You are not authorized');
      let verifiedUser: (JwtPayload & { userId: string; role: string }) | null = null;
      try {
        verifiedUser = jwtHelpers.verifyToken(token, config.jwt.secret as Secret) as JwtPayload & {
          userId: string;
          role: string;
        };
      } catch {
        throw new ApiError(httpStatus.FORBIDDEN, 'Invalid or expired token');
      }
      req.user = verifiedUser ?? undefined;
      if (requiredRoles.length && !requiredRoles.includes(verifiedUser!.role)) {
        throw new ApiError(httpStatus.FORBIDDEN, 'Forbidden');
      }
      next();
    } catch (error) {
      next(error);
    }
  };

export default auth;
