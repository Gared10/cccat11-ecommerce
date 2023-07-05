import RepositoryFactory from "../../application/factory/RepositoryFactory";
import SimulateFare from "../../application/usecase/SimulateFare";
import UseCaseFactory from "../../application/factory/UseCaseFactory";
import GatewayFactory from "../../application/factory/GatewayFactory";
import GetLocation from "../../application/usecase/GetLocation";

export default class HttpUseCaseFactory implements UseCaseFactory {

  constructor(readonly repositoryFactory: RepositoryFactory, readonly gatewayFactory: GatewayFactory) {
  }

  createGetLocation(): GetLocation {
    return new GetLocation(this.repositoryFactory);
  }

  createSimulateFare(): SimulateFare {
    return new SimulateFare(this.repositoryFactory, this.gatewayFactory);
  }

}