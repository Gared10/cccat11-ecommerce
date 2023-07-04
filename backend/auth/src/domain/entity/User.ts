import Email from "./Email";
import { pbkdf2Sync, randomBytes } from 'crypto';
import Password from "./Password";

export default class User {
  email: Email;
  password: Password

  private constructor(email: string, password: Password) {
    this.email = new Email(email);
    this.password = password;
  }

  static create(email: string, password: string) {
    return new User(email, Password.create(password));
  }

  static restore(email: string, hash: string, salt: string) {
    return new User(email, Password.restore(hash, salt));
  }

  updatePassword(password: string) {
    this.password = Password.create(password);
  }

  validatePassword(password: string) {
    return this.password.validate(password);
  }
}