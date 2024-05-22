import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/user.model';

const signToken = (id: string): string => {
  return jwt.sign({ id }, process.env.JWT_SECRET_KEY as string, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const setAuthCookie = (res: Response, token: string) => {
  res.cookie('auth_token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'prod',
    maxAge: 86400000,
  });
};

const signup = async (req: Request, res: Response) => {
  try {
    const user = await User.create(req.body);

    // Assign token
    const token = signToken(user.id);
    setAuthCookie(res, token);

    res.status(200).json({ status: 'success', data: user });
  } catch (error) {
    console.log('Error 💥: ', error);
    res.status(500).json({ message: error });
  }
};

const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    // check user credentials
    if (!user || !(await user.verifyPassword(password, user.password)))
      return res
        .status(404)
        .json({ status: 'error', message: 'Invalid user credentials' });

    // Assign token
    const token = signToken(user.id);
    setAuthCookie(res, token);

    res.status(200).json({ status: 'success', data: user });
  } catch (error) {
    console.log('Error 💥: ', error);
    res.status(500).json({ message: error });
  }
};

export default {
  signup,
  login,
};
