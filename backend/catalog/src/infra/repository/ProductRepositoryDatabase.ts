import pgp from "pg-promise";
import ProductRepository from "../../application/usecase/interface/ProductRepository";
import Product from "../../domain/entity/Product";
import DatabaseConnection from "../database/DatabaseConnection";

export default class ProductRepositoryDatabase implements ProductRepository {
  constructor(readonly connection: DatabaseConnection) {
  }
  async list(): Promise<Product[]> {
    const productData = await this.connection.query("select id_product, description, price, width, height, weight, product_length from ecommerce.product", []);
    let products: Product[] = [];
    for (const product of productData) {
      products.push(new Product(product.description, parseFloat(product.price), product.id_product, parseFloat(product.height), parseFloat(product.weight), parseFloat(product.width), parseFloat(product.product_length)))
    }
    return products;
  }

  async get(idProduct: number): Promise<Product> {
    const [productData] = await this.connection.query("select id_product, description, price, width, height, weight, product_length from ecommerce.product where id_product = $1", [idProduct]);
    const product = new Product(productData.description, parseFloat(productData.price), productData.id_product, parseFloat(productData.height), parseFloat(productData.weight), parseFloat(productData.width), parseFloat(productData.product_length))
    return product;
  }
}