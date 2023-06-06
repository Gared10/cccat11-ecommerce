import Location from "./Location";

export default interface LocationRepository {
  get(CEP: string): Promise<Location>;
}