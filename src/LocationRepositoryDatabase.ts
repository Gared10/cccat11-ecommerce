import Location from "./Location";
import LocationRepository from "./LocationRepository";
import pgp from "pg-promise";

export default class LocationRepositoryDatabase implements LocationRepository {
  async get(CEP: string): Promise<Location> {
    const connection = pgp()("postgres://postgres:postgres123@localhost:5432/app");
    const [locationData] = await connection.query('select * from ecommerce.location where cep = $1', [CEP]);
    const location = new Location(locationData.CEP, parseFloat(locationData.latitude), parseFloat(locationData.longitude));
    await connection.$pool.end();
    return location;
  }
}