import userDao from '../dao/user.dao';
import { generateToken } from '../utils/auth';
import { AuthResponse, UserInput, UserResponse } from '../types/user.types';

export const register = async (userData: UserInput): Promise<AuthResponse> => {
  const existingUser = await userDao.findByUsername(userData.username);
  if (existingUser) {
    throw new Error('User already exists');
  }

  const user = await userDao.createUser(userData);

  const token = generateToken(user.id, user.username, user.createdAt);

  const userResponse: UserResponse = {
    id: user.id,
    username: user.username,
    createdAt: user.createdAt
  };

  return { token, user: userResponse };
};

export const login = async (userData: UserInput): Promise<AuthResponse> => {
  const user = await userDao.findByUsername(userData.username);
  if (!user) {
    throw new Error('Invalid credentials');
  }

  const isValidPassword = await userDao.comparePassword(userData.password, user.password);
  if (!isValidPassword) {
    throw new Error('Invalid credentials');
  }

  const token = generateToken(user.id, user.username, user.createdAt);

  const userResponse: UserResponse = {
    id: user.id,
    username: user.username,
    createdAt: user.createdAt
  };

  return { token, user: userResponse };
};

const authService = {
  register,
  login
};

export default authService;