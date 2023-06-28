import HttpServer from "./HttpServer";
import UseCaseFactory from "../../application/usecase/interface/UseCaseFactory";

export default class HttpController {


  constructor(readonly httpServer: HttpServer, readonly useCaseFactory: UseCaseFactory) {

    httpServer.on("get", "/products/:idProduct", async (body: any, params: any, headers: any) => {
      const output = {};
      return output;
    })
    httpServer.on("get", "/products", async (body: any, params: any, headers: any) => {
      const output = {};
      return output;
    })
  }
}