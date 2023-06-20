import Checkout from "./Checkout";
import ListOrders from "./ListOrders";
import RepositoryFactory from "./RepositoryFactory";
import SimulateFare from "./SimulateFare";
import UseCaseFactory from "./UseCaseFactory";

export default class HttpUseCaseFactory implements UseCaseFactory {

  constructor(readonly repositoryFactory: RepositoryFactory) {
  }

  createCheckout(): Checkout {
    return new Checkout(this.repositoryFactory);
  }
  createListOrders(): ListOrders {
    return new ListOrders(this.repositoryFactory);
  }
  createSimulateFare(): SimulateFare {
    return new SimulateFare(this.repositoryFactory);
  }

}