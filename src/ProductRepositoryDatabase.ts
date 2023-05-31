import pgp from "pg-promise";
import ProductRepository from "./ProductRepository";
import Product from "./Product";

export default class ProductRepositoryDatabase implements ProductRepository {
  async get(idProduct: number): Promise<Product> {
    const connection = pgp()("postgres://postgres:postgres123@localhost:5432/app")
    const [productData] = await connection.query("select id_product, description, price, width, height, weight, product_length from ecommerce.product where id_product = $1", [idProduct]);
    const product = new Product(productData.description, parseFloat(productData.price), productData.id_product, parseFloat(productData.height), parseFloat(productData.weight), parseFloat(productData.width), parseFloat(productData.product_length))
    await connection.$pool.end();
    return product;
  }
}