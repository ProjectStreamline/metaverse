import { Request, Response } from 'express';
import authService from '../services/auth.service';
import { UserInput } from '../types/user.types';

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      res.status(400).json({ message: 'Please provide username and password' });
      return;
    }

    const result = await authService.register({ username, password } as UserInput);

    res.status(201).json(result);
  } catch (error) {
    console.error('Registration error:', error);
    
    if (error instanceof Error) {
      if (error.message === 'User already exists') {
        res.status(400).json({ message: error.message });
        return;
      }
    }
    
    res.status(500).json({ message: 'Server error' });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      res.status(400).json({ message: 'Please provide username and password' });
      return;
    }

    const result = await authService.login({ username, password } as UserInput);

    res.status(200).json(result);
  } catch (error) {
    console.error('Login error:', error);
    
    if (error instanceof Error) {
      if (error.message === 'Invalid credentials') {
        res.status(400).json({ message: error.message });
        return;
      }
    }
    
    res.status(500).json({ message: 'Server error' });
  }
};

const authController = {
  register,
  login
};

export default authController;