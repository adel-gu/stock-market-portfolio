import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/user.model';

declare global {
  namespace Express {
    interface Request {
      userId: string;
    }
  }
}

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

    res.status(200).json({ status: 'success' });
  } catch (error) {
    console.log('Error 💥: ', error);
    res.status(500).json({ message: error });
  }
};

const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select('password');

    // check user credentials
    if (!user || !(await user.verifyPassword(password, user.password)))
      return res
        .status(404)
        .json({ status: 'error', message: 'Invalid user credentials' });

    // Assign token
    const token = signToken(user.id);
    setAuthCookie(res, token);

    res.status(200).json({ status: 'success' });
  } catch (error) {
    console.log('Error 💥: ', error);
    res.status(500).json({ message: error });
  }
};

const logout = async (req: Request, res: Response) => {
  try {
    res.clearCookie('auth_token');
    res.sendStatus(200);
  } catch (error) {
    console.log('Error 💥: ', error);
    res.status(500).json({ message: error });
  }
};

const protect = async (req: Request, res: Response, next: NextFunction) => {
  // 1. get token
  const token = req.cookies['auth_token'];

  if (!token)
    return res
      .status(401)
      .json({ status: 'fail', message: 'Access denied please login' });

  // 2. verify token
  const decode = jwt.verify(
    token,
    process.env.JWT_SECRET_KEY as string,
  ) as jwt.JwtPayload;

  const user = await User.findById(decode.id);

  // 3. verify if token is issued after the user changed password
  if (!user || (decode.iat && user.checkPasswordChangeAfter(decode.iat)))
    return res
      .status(401)
      .json({ status: 'fail', message: 'Access denied please login' });

  // 4. set req.userId
  req.userId = user._id.toString();
  next();
};

const getLoggedUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const user = await User.findById(req.userId);
    if (!user)
      return res.status(401).json({
        status: 'fail',
        message: 'User is logged out, please login again.',
      });

    res.status(200).json({ status: 'success', data: user });
  } catch (error) {
    console.log('Error: ', error);
    res.status(500).json({ status: 'fail', error: error });
  }
};

export default {
  signup,
  login,
  protect,
  getLoggedUser,
  logout,
};
