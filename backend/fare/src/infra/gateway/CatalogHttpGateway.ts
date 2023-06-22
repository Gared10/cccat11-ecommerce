import CatalogGateway from "../../application/gateway/CatalogGateway";
import Coord from "../../domain/entity/Coord";
import Product from "../../domain/entity/Product";
import HttpClient from "../http/HttpClient";

export default class CatalogHttpGateway implements CatalogGateway {

  constructor(readonly httpClient: HttpClient) {
  }

  async getProduct(idProduct: number): Promise<Product> {
    const output = await this.httpClient.get(`http://localhost:3001/products/${idProduct}`)
    const product = new Product(output.description, output.price, output.idProduct, output.height, output.weight, output.width, output.product_length)
    return product;
  }

}