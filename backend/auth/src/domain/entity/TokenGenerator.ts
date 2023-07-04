import User from "./User";
import { sign } from 'jsonwebtoken';

export default class TokenGenerator {
  EXPIRES_IN = 1000000;

  constructor(readonly key: string) {
  }

  sign(user: User, date: Date) {
    return sign({ email: user.email.value, iat: date.getTime(), expiresIn: this.EXPIRES_IN }, this.key);
  }
}