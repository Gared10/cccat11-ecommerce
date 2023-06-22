import HttpServer from "./HttpServer";
import UseCaseFactory from "../../application/factory/UseCaseFactory";
import SimulateFare from "../../application/usecase/SimulateFare";

export default class HttpController {
  simulateFare: SimulateFare;

  constructor(readonly httpServer: HttpServer, readonly useCaseFactory: UseCaseFactory) {
    this.simulateFare = useCaseFactory.createSimulateFare();
    httpServer.on("get", "/simulateFare", async (body: any, params: any) => {
      const output = await this.simulateFare.execute(body);
      return output;
    })
  }
}