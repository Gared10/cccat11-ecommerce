import HttpServer from "./HttpServer";
import UseCaseFactory from "../../application/usecase/interface/UseCaseFactory";

export default class HttpController {

  constructor(readonly httpServer: HttpServer, readonly useCaseFactory: UseCaseFactory) {

    httpServer.on("post", "/verify", async (body: any, params: any, headers: any) => {
      const verify = useCaseFactory.createVerify();
      const output = await verify.execute(body.token);
      return output;
    })
  }
}