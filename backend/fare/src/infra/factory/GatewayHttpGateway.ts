import GatewayFactory from "../../application/factory/GatewayFactory";
import CatalogGateway from "../../application/gateway/CatalogGateway";
import CatalogHttpGateway from "../gateway/CatalogHttpGateway";
import HttpClient from "../http/HttpClient";

export default class GatewayHttpFactory implements GatewayFactory {

  constructor(readonly httpClient: HttpClient) {
  }

  createCatalogGateway(): CatalogGateway {
    return new CatalogHttpGateway(this.httpClient);
  }

}