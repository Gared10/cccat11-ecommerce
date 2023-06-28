import UserRepository from "../../application/usecase/interface/UserRepository";
import User from "../../domain/entity/User";
import DatabaseConnection from "../database/DatabaseConnection";

export default class UserRepositoryDatabase implements UserRepository {

  constructor(readonly connection: DatabaseConnection) {
  }

  async save(user: User): Promise<void> {
    await this.connection.query("insert into ecommerce.user(email, password, salt) values($1, $2, $3)", [user.email, user.password, user.salt]);
  }

  async get(email: string): Promise<User> {
    const [userData] = await this.connection.query("select * from ecommerce.user where email = $1", [email]);
    const user = new User(userData.email, userData.password, userData.salt);
    return user;
  }

}