import GatewayFactory from "../../application/factory/GatewayFactory";
import AuthGateway from "../../application/gateway/AuthGateway";
import CatalogGateway from "../../application/gateway/CatalogGateway";
import FareGateway from "../../application/gateway/FareGateway";
import AuthHttpGateway from "../gateway/AuthHttpGateway";
import CatalogHttpGateway from "../gateway/CatalogHttpGateway";
import FareHttpGateway from "../gateway/FareHttpGateway";
import HttpClient from "../http/HttpClient";

export default class GatewayHttpFactory implements GatewayFactory {

  constructor(readonly httpClient: HttpClient) {
  }

  createFareGateway(): FareGateway {
    return new FareHttpGateway(this.httpClient);
  }

  createCatalogGateway(): CatalogGateway {
    return new CatalogHttpGateway(this.httpClient);
  }

  createAuthGateway(): AuthGateway {
    return new AuthHttpGateway(this.httpClient);
  }
}