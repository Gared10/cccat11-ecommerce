import Order from "./Order";
import pgp from "pg-promise";
import OrderRepository from "./OrderRepository";

export default class OrderRepositoryDatabase implements OrderRepository {

  async save(order: Order) {
    const connection = pgp()("postgres://postgres:postgres123@localhost:5432/app");
    // const [orderInstance] = connection.query('insert into ecommerce.order')
    await connection.$pool.end();
  }
}