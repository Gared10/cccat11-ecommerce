import Verify from "../../application/usecase/Verify";
import RepositoryFactory from "../../application/usecase/interface/RepositoryFactory";
import UseCaseFactory from "../../application/usecase/interface/UseCaseFactory";

export default class HttpUseCaseFactory implements UseCaseFactory {

  constructor(readonly repositoryFactory: RepositoryFactory) {
  }

  createVerify(): Verify {
    return new Verify();
  }


}