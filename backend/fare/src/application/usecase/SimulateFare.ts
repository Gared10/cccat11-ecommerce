import Coord from "../../domain/entity/Coord";
import DistanceCalculator from "../../domain/entity/DistanceCalculator";
import { calculateFare } from "../../domain/entity/calculateFare";
import GatewayFactory from "../factory/GatewayFactory";
import CatalogGateway from "../gateway/CatalogGateway";

export default class SimulateFare {
  catalogGateway: CatalogGateway;

  constructor(
    gatewayFactory: GatewayFactory
  ) {
    this.catalogGateway = gatewayFactory.createCatalogGateway();
  }

  async execute(input: Input): Promise<Output> {
    let output = {
      fare: 0
    }
    if (input.from && input.to) {
      for (const item of input.items) {
        const productData = await this.catalogGateway.getProduct(item.idProduct)
        const fromCoord = new Coord(input.from.latitude, input.from.longitude)
        const toCoord = new Coord(input.to.latitude, input.to.longitude)
        const distance = DistanceCalculator.calculate(fromCoord, toCoord);
        output.fare += calculateFare(productData, distance)
      }
    }
    return output;
  }
}

type Input = {
  items: { idProduct: number, quantity: number }[],
  from: { CEP: string, latitude: number, longitude: number },
  to: { CEP: string, latitude: number, longitude: number }
}

type Output = {
  fare: number
}