import Coord from "../../domain/entity/Coord";
import DistanceCalculator from "../../domain/entity/DistanceCalculator";
import { calculateFare } from "../../domain/entity/calculateFare";
import GatewayFactory from "../factory/GatewayFactory";
import RepositoryFactory from "../factory/RepositoryFactory";
import CatalogGateway from "../gateway/CatalogGateway";
import LocationRepository from "../repository/LocationRepository";

export default class SimulateFare {
  catalogGateway: CatalogGateway;
  locationRepository: LocationRepository;

  constructor(
    repositoryFactory: RepositoryFactory,
    gatewayFactory: GatewayFactory
  ) {
    this.catalogGateway = gatewayFactory.createCatalogGateway();
    this.locationRepository = repositoryFactory.createLocationRepository();
  }

  async execute(input: Input): Promise<Output> {
    let output = {
      fare: 0
    }
    if (input.from && input.to) {
      for (const item of input.items) {
        const productData = await this.catalogGateway.getProduct(item.idProduct)
        const from = await this.locationRepository.get(input.from);
        const to = await this.locationRepository.get(input.to);
        const distance = DistanceCalculator.calculate(from.getCoords(), to.getCoords());
        output.fare += calculateFare(productData, distance)
      }
    }
    return output;
  }
}

type Input = {
  items: { idProduct: number, quantity: number }[],
  from: string,
  to: string
}

type Output = {
  fare: number
}