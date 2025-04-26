import bcrypt from 'bcrypt';
import { User, UserInput } from '../types/user.types';
import prisma from './db';

export const findByUsername = async (username: string): Promise<User> => {
  return prisma.user.findUnique({
    where: { username }
  });
};

export const createUser = async (userData: UserInput): Promise<User> => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(userData.password, salt);

  return prisma.user.create({
    data: {
      username: userData.username,
      password: hashedPassword
    }
  });
};

export const comparePassword = async (
  plainPassword: string, 
  hashedPassword: string
): Promise<boolean> => {
  return bcrypt.compare(plainPassword, hashedPassword);
};

const userDao = {
  findByUsername,
  createUser,
  comparePassword
};

export default userDao;