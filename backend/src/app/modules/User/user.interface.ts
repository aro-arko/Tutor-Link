import { Model } from 'mongoose';
import { USER_ROLES } from './user.constant';

export type TUser = {
  name: string;
  email: string;
  password: string;
  role: 'admin' | 'student' | 'tutor';
  phone?: string;
  address?: string;
  city?: string;
  createdAt: Date;
  updatedAt: Date;
};

export interface UserModel extends Model<TUser> {
  isUserExistsByEmail(email: string): Promise<TUser>;
  isPasswordMatched(
    plainTextPassowrd: string,
    hashedPassword: string,
  ): Promise<boolean>;
}

export type TUserRole = keyof typeof USER_ROLES;
