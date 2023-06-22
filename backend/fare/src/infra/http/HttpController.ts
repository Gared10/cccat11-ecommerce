import HttpServer from "./HttpServer";
import UseCaseFactory from "../../application/factory/UseCaseFactory";
import SimulateFare from "../../application/usecase/SimulateFare";
import GetLocation from "../../application/usecase/GetLocation";

export default class HttpController {
  simulateFare: SimulateFare;
  getLocation: GetLocation;

  constructor(readonly httpServer: HttpServer, readonly useCaseFactory: UseCaseFactory) {
    this.simulateFare = useCaseFactory.createSimulateFare();
    this.getLocation = useCaseFactory.createGetLocation();
    httpServer.on("get", "/simulateFare", async (body: any, params: any) => {
      const output = await this.simulateFare.execute(body);
      return output;
    })
    httpServer.on("get", "/locations/:cep", async (body: any, params: any) => {
      const output = await this.getLocation.execute(params);
      return output;
    })
  }
}