import mongoose, { Model } from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcrypt';

interface IUser {
  name: string;
  email: string;
  password: string;
  passwordConfirm: string | undefined;
  photo?: string;
  passwordChangedAt?: Date;
}

type UserModel = Model<IUser>;

const userSchema = new mongoose.Schema<IUser, UserModel>({
  name: { type: String, required: [true, 'Please tell us your name'] },
  email: {
    type: String,
    unique: true,
    lowercase: true,
    required: [true, 'Email field is required'],
    validate: [validator.isEmail, 'Please provide a valid email'],
  },
  password: {
    type: String,
    required: [true, 'Password field is required'],
    minlength: 8,
  },
  passwordConfirm: {
    type: String,
    validate: {
      validator: function (this: IUser, val: string): boolean {
        return val === this.password;
      },
      message: 'Password confirmation is not matched',
    },
  },
  photo: String,
  passwordChangedAt: Date,
});

// hash password
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
  next();
});

const User = mongoose.model('User', userSchema);
export default User;
