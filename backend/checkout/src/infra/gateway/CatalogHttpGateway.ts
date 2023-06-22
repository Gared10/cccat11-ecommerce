import CatalogGateway from "../../application/gateway/CatalogGateway";
import Product from "../../domain/entity/Product";
import HttpClient from "../http/HttpClient";

export default class CatalogHttpGateway implements CatalogGateway {

  constructor(readonly httpClient: HttpClient) {
  }

  async listProducts(): Promise<Product[]> {
    const output = await this.httpClient.get(`http://localhost:3001/products`)
    let products = []
    for (const product of output) {
      products.push(new Product(product.description, product.price, product.idProduct, product.height, product.weight, product.width, product.product_length))
    }
    return products;
  }

  async getProduct(idProduct: number): Promise<Product> {
    const output = await this.httpClient.get(`http://localhost:3001/products/${idProduct}`)
    const product = new Product(output.description, output.price, output.idProduct, output.height, output.weight, output.width, output.product_length)
    return product;
  }

}