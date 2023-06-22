import CatalogGateway from "../gateway/CatalogGateway";

export default interface GatewayFactory {
  createCatalogGateway(): CatalogGateway;
}