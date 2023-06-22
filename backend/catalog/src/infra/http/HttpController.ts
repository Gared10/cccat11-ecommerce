import HttpServer from "./HttpServer";
import GetProduct from "../../application/usecase/GetProduct";
import UseCaseFactory from "../../application/usecase/interface/UseCaseFactory";
import ListProducts from "../../application/usecase/ListProducts";

export default class HttpController {
  getProduct: GetProduct;
  listProducts: ListProducts;

  constructor(readonly httpServer: HttpServer, readonly useCaseFactory: UseCaseFactory) {
    this.getProduct = useCaseFactory.createGetProduct();
    this.listProducts = useCaseFactory.createListProducts();
    httpServer.on("get", "/products/:idProduct", async (body: any, params: any, headers: any) => {
      const output = await this.getProduct.execute(params.idProduct);
      return output;
    })
    httpServer.on("get", "/products", async (body: any, params: any, headers: any) => {
      const output = await this.listProducts.execute();
      return output;
    })
  }
}