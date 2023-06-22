import DatabaseConnection from "../database/DatabaseConnection";
import ProductRepository from "../../application/usecase/interface/ProductRepository";
import ProductRepositoryDatabase from "../repository/ProductRepositoryDatabase";
import RepositoryFactory from "../../application/usecase/interface/RepositoryFactory";

export default class DatabaseRepositoryFactory implements RepositoryFactory {
  constructor(readonly connection: DatabaseConnection) {
  }

  createProductRepository(): ProductRepository {
    return new ProductRepositoryDatabase(this.connection);
  }

}