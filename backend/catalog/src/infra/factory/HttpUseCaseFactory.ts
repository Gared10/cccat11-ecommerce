import RepositoryFactory from "../../application/usecase/interface/RepositoryFactory";
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

}