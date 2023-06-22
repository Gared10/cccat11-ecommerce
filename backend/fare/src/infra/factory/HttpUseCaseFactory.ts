import RepositoryFactory from "../../application/factory/RepositoryFactory";
import SimulateFare from "../../application/usecase/SimulateFare";
import UseCaseFactory from "../../application/factory/UseCaseFactory";
import GatewayFactory from "../../application/factory/GatewayFactory";

export default class HttpUseCaseFactory implements UseCaseFactory {

  constructor(readonly repositoryFactory: RepositoryFactory, readonly gatewayFactory: GatewayFactory) {
  }

  createSimulateFare(): SimulateFare {
    return new SimulateFare(this.gatewayFactory);
  }

}