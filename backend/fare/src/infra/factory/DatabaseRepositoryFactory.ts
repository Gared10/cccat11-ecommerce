import DatabaseConnection from "../database/DatabaseConnection";
import LocationRepositoryDatabase from "../repository/LocationRepositoryDatabase";
import RepositoryFactory from "../../application/factory/RepositoryFactory";
import LocationRepository from "../../application/repository/LocationRepository";

export default class DatabaseRepositoryFactory implements RepositoryFactory {
  constructor(readonly connection: DatabaseConnection) {
  }

  createLocationRepository(): LocationRepository {
    return new LocationRepositoryDatabase(this.connection);
  }

}