import LocationRepository from "../repository/LocationRepository";

export default interface RepositoryFactory {
  createLocationRepository(): LocationRepository;
}