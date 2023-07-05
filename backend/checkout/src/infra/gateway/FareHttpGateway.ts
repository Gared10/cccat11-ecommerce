import FareGateway from "../../application/gateway/FareGateway";
import Location from "../../domain/entity/Location";
import HttpClient from "../http/HttpClient";

export default class FareHttpGateway implements FareGateway {

  constructor(readonly httpClient: HttpClient) {
  }

  async getLocation(cep: string): Promise<Location> {
    const locationData = await this.httpClient.get(`http://localhost:3002/locations/${cep}`);
    const location = new Location(locationData.CEP, locationData.latitude, locationData.longitude)
    return location;
  }

  async simulateFare(fare: any): Promise<number> {
    const output = await this.httpClient.get("http://localhost:3002/simulateFare", fare)
    return output.fare
  }

}