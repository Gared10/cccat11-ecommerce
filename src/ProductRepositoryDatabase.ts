import pgp from "pg-promise";
import ProductRepository from "./ProductRepository";

export default class CProductRepositoryDatabase implements ProductRepository {
  async get(idProduct: number) {
    const connection = pgp()("postgres://postgres:postgres123@localhost:5432/app")
    const [productData] = await connection.query("select description, price, width, height, weight, product_length from ecommerce.product where id_product = $1", [idProduct]);
    await connection.$pool.end();
    return productData;
  }
}