import Checkout from "../../application/usecase/Checkout";
import ListOrders from "../../application/usecase/ListOrders";
import RepositoryFactory from "../../application/factory/RepositoryFactory";
import UseCaseFactory from "../../application/factory/UseCaseFactory";
import GatewayFactory from "../../application/factory/GatewayFactory";
import AuthDecorator from "../../application/decorator/AuthDecorator";
import Usecase from "../../application/usecase/Usecase";

export default class HttpUseCaseFactory implements UseCaseFactory {

  constructor(readonly repositoryFactory: RepositoryFactory, readonly gatewayFactory: GatewayFactory) {
  }

  createCheckout(): Usecase {
    return new AuthDecorator(new Checkout(this.repositoryFactory, this.gatewayFactory), this.gatewayFactory);
  }
  createListOrders(): Usecase {
    return new AuthDecorator(new ListOrders(this.repositoryFactory), this.gatewayFactory);
  }

}