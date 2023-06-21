import Checkout from "../../application/usecase/Checkout";
import ListOrders from "../../application/usecase/ListOrders";
import RepositoryFactory from "../../application/usecase/interface/RepositoryFactory";
import SimulateFare from "../../application/usecase/SimulateFare";
import UseCaseFactory from "../../application/usecase/interface/UseCaseFactory";
import GetProduct from "../../application/usecase/GetProduct";
import ListProducts from "../../application/usecase/ListProducts";

export default class HttpUseCaseFactory implements UseCaseFactory {

  constructor(readonly repositoryFactory: RepositoryFactory) {
  }
  createGetProduct(): GetProduct {
    return new GetProduct(this.repositoryFactory);
  }
  createListProducts(): ListProducts {
    return new ListProducts(this.repositoryFactory);
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