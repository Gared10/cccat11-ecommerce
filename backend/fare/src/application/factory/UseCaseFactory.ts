import GetLocation from "../usecase/GetLocation";
import SimulateFare from "../usecase/SimulateFare";

export default interface UseCaseFactory {
  createSimulateFare(): SimulateFare;
  createGetLocation(): GetLocation;
}