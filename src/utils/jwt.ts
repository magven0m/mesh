import jwt, { JwtPayload } from 'jsonwebtoken';

export interface DecodedToken extends JwtPayload {
  id: number;
  email: string;
  nickname: string;
  isAccessToken?: string;
}

export function generateAccessToken(user: DecodedToken): string {
  const { id, email, nickname } = user;

  return jwt.sign({ id, email, nickname, isAccessToken: true }, process.env.JWT_SECRET, {
    expiresIn: '1h',
  });
}

export function generateRefreshToken(user: DecodedToken): string {
  const { id, email, nickname } = user;

  return jwt.sign({ id, email, nickname, isAccessToken: false }, process.env.JWT_SECRET, {
    expiresIn: '240h',
  });
}

export function verifyToken(token: string): DecodedToken {
  return jwt.verify(token, process.env.JWT_SECRET) as DecodedToken;
}
