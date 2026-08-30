import jwt, { JwtPayload, Secret } from 'jsonwebtoken';
const createToken = (payload: object, secret: Secret, expiresIn: string): string =>
  jwt.sign(payload, secret, { expiresIn } as any);
const verifyToken = (token: string, secret: Secret): JwtPayload =>
  jwt.verify(token, secret) as JwtPayload;
export const jwtHelpers = { createToken, verifyToken };
