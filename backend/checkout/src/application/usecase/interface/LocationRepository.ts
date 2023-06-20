import Location from "../../../domain/entity/Location";

export default interface LocationRepository {
  get(CEP: string): Promise<Location>;
}