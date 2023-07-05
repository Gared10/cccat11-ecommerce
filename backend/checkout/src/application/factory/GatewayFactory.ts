import AuthGateway from "../gateway/AuthGateway";
import CatalogGateway from "../gateway/CatalogGateway";
import FareGateway from "../gateway/FareGateway";

export default interface GatewayFactory {
  createCatalogGateway(): CatalogGateway;
  createFareGateway(): FareGateway;
  createAuthGateway(): AuthGateway;
}