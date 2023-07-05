import Verify from "../Verify";

export default interface UseCaseFactory {
  createVerify(): Verify;
}