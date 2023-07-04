import UserRepository from "../../application/usecase/interface/UserRepository";
import User from "../../domain/entity/User";
import DatabaseConnection from "../database/DatabaseConnection";

export default class UserRepositoryDatabase implements UserRepository {

  constructor(readonly connection: DatabaseConnection) {
  }

  async save(user: User): Promise<void> {
    await this.connection.query("insert into ecommerce.user(email, password, salt) values($1, $2, $3)", [user.email.value, user.password.value, user.password.salt]);
  }

  async get(email: string): Promise<User> {
    const [userData] = await this.connection.query("select * from ecommerce.user where email = $1", [email]);
    return User.restore(userData.email, userData.password, userData.salt);;
  }

  async clear(email: string): Promise<void> {
    await this.connection.query("delete from ecommerce.user where email = $1", [email])
  }

}