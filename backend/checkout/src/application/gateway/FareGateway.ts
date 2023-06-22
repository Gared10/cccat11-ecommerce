import Location from "../../domain/entity/Location";

export default interface FareGateway {
  simulateFare(fare: Input): Promise<number>;
  getLocation(cep: string): Promise<Location>;
}

type Input = {
  items: { idProduct: number, quantity: number }[],
  from: { CEP: string, latitude: number, longitude: number },
  to: { CEP: string, latitude: number, longitude: number }
}