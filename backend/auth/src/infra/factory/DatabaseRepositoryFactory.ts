import DatabaseConnection from "../database/DatabaseConnection";
import RepositoryFactory from "../../application/usecase/interface/RepositoryFactory";
import UserRepositoryDatabase from "../repository/UserRepositoryDatabase";
import UserRepository from "../../application/usecase/interface/UserRepository";

export default class DatabaseRepositoryFactory implements RepositoryFactory {
  constructor(readonly connection: DatabaseConnection) {
  }
  createUserRepository(): UserRepository {
    return new UserRepositoryDatabase(this.connection);
  }

}