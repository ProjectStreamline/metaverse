import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import { JwtPayload } from '../types/user.types';

dotenv.config();

export const config = {
  port: process.env.PORT || 5000,
  jwtSecret: process.env.JWT_SECRET || 'your_jwt_secret',
};

export const generateToken = (userId: number, username: string, createdAt: Date): string => {
  return jwt.sign(
    { 
      id: userId,
      username,
      createdAt: createdAt.toISOString()
    },
    config.jwtSecret
  );
};

export const verifyToken = (token: string): JwtPayload => {
  return jwt.verify(token, config.jwtSecret) as JwtPayload;
};