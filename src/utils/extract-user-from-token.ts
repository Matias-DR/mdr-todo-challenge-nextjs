import { decode } from 'jsonwebtoken';

interface User {
  pk: number;
  username: string;
  email: string;
}

const extractUserFromToken = (token: string): User | undefined => {
  try {
    const user = decode(token) as User;
    return user;
  } catch {
    return undefined;
  }
};

export default extractUserFromToken;
