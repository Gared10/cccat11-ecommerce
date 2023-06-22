import SimulateFare from "../usecase/SimulateFare";

export default interface UseCaseFactory {
  createSimulateFare(): SimulateFare;
}