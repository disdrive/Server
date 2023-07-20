import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
dotenv.config();

export const hashPassword = async (password: string): Promise<string> => {
  return bcrypt.hash(password, Number(process.env.SALT_ROUNDS) || 10);
};
