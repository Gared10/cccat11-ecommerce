import Checkout from "../../application/usecase/Checkout";
import ListOrders from "../../application/usecase/ListOrders";
import RepositoryFactory from "../../application/factory/RepositoryFactory";
import UseCaseFactory from "../../application/factory/UseCaseFactory";
import GatewayFactory from "../../application/factory/GatewayFactory";

export default class HttpUseCaseFactory implements UseCaseFactory {

  constructor(readonly repositoryFactory: RepositoryFactory, readonly gatewayFactory: GatewayFactory) {
  }

  createCheckout(): Checkout {
    return new Checkout(this.repositoryFactory, this.gatewayFactory);
  }
  createListOrders(): ListOrders {
    return new ListOrders(this.repositoryFactory);
  }

}