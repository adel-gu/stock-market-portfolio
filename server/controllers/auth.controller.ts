import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/user.model';

const signup = async (req: Request, res: Response) => {
  try {
    const user = await User.create(req.body);

    // Assign token
    const token = jwt.sign(
      { id: user.id },
      process.env.JWT_SECRET_KEY as string,
      {
        expiresIn: process.env.JWT_EXPIRES_IN,
      },
    );

    res.cookie('auth_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'prod',
      maxAge: 86400000,
    });

    res.status(200).json({ status: 'success', data: user });
  } catch (error) {
    console.log('Error 💥: ', error);
    res.status(500).json({ message: error });
  }
};

export default {
  signup,
};
