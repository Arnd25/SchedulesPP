import { Role } from 'src/generated/prisma/client';
import { Request } from 'express';

export enum AppRole {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

export interface RequestWithUser extends Request {
  user: {
    userId: string;
    email: string;
    role: AppRole;
  };
}

export type TokenPair = {
  accessToken: string;
  refreshToken: string;
};

export type JwtPayload = {
  sub: string;
  email: string;
  role: Role;
};