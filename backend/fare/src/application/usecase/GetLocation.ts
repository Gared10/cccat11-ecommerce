import Location from "../../domain/entity/Location";
import RepositoryFactory from "../factory/RepositoryFactory"
import LocationRepository from "../repository/LocationRepository";

export default class GetLocation {
  locationRepository: LocationRepository;

  constructor(readonly repositoryFactory: RepositoryFactory) {
    this.locationRepository = repositoryFactory.createLocationRepository();
  }

  async execute(input: Input): Promise<Location> {
    const location = await this.locationRepository.get(input.cep);
    return location;
  }
}

type Input = {
  cep: string
}