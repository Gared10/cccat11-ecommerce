import Checkout from "./Checkout";
import HttpServer from "./HttpServer";
import ListOrders from "./ListOrders";
import UseCaseFactory from "./UseCaseFactory";

export default class HttpController {
  checkout: Checkout;
  listOrders: ListOrders;

  constructor(readonly httpServer: HttpServer, readonly useCaseFactory: UseCaseFactory) {
    this.checkout = useCaseFactory.createCheckout();
    this.listOrders = useCaseFactory.createListOrders();
    httpServer.on("post", "/checkout", async (body: any, params: any) => {
      const output = await this.checkout.execute(body);
      return output;
    })
    httpServer.on("get", "/orders", async (body: any, params: any) => {
      const output = await this.listOrders.execute();
      return output;
    })
  }
}