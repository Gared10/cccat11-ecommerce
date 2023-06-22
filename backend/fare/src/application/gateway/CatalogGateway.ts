import Coord from "../../domain/entity/Coord";
import Product from "../../domain/entity/Product";

export default interface CatalogGateway {
  getProduct(idProduct: number): Promise<Product>;
}