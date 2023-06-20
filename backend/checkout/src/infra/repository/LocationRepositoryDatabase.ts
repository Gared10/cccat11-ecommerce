import DatabaseConnection from "../database/DatabaseConnection";
import Location from "../../domain/entity/Location";
import LocationRepository from "../../application/usecase/interface/LocationRepository";
import pgp from "pg-promise";

export default class LocationRepositoryDatabase implements LocationRepository {

  constructor(readonly connection: DatabaseConnection) {
  }

  async get(CEP: string): Promise<Location> {
    const [locationData] = await this.connection.query('select * from ecommerce.location where cep = $1', [CEP]);
    const location = new Location(locationData.cep, parseFloat(locationData.latitude), parseFloat(locationData.longitude));
    return location;
  }
}