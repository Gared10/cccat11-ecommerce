import Order from "./Order";
import pgp from "pg-promise";
import OrderRepository from "./OrderRepository";
import ProductRepositoryDatabase from "./ProductRepositoryDatabase";
import Product from "./Product";
import ProductRepository from "./ProductRepository";

export default class OrderRepositoryDatabase implements OrderRepository {

  constructor(readonly productRepository: ProductRepository = new ProductRepositoryDatabase) {
  }

  async get(idOrder: string) {
    const connection = pgp()("postgres://postgres:postgres123@localhost:5432/app");
    const [orderData] = await connection.query('select * from ecommerce.order_header where id_order = $1', [idOrder]);
    const orderItemsData = await connection.query('select * from ecommerce.order_items where id_order = $1', [idOrder]);
    const order = new Order(orderData.cpf, orderData.id_order, orderData.code)
    for (const item of orderItemsData) {
      const product = await this.productRepository.get(item.id_product);
      order.addOrderItem(item.quantity, product);
    }
    await connection.$pool.end();
    return order;
  }

  async save(order: Order) {
    const connection = pgp()("postgres://postgres:postgres123@localhost:5432/app");
    for (const item of order.getItems()) {
      await connection.query('insert into ecommerce.order_items(id_product, id_order, quantity, price) values ($1, $2, $3, $4)', [item.getIdProduct(), order.getId(), item.getQuantity(), item.getPrice()])
    }
    const [orderInstance] = await connection.query('insert into ecommerce.order_header(id_order, code, cpf) values ($1, $2, $3)', [order.getId(), order.getCode(), order.getCpf()])
    await connection.$pool.end();
  }

  async count() {
    const connection = pgp()("postgres://postgres:postgres123@localhost:5432/app");
    const [orderData] = await connection.query('select count(1)::integer from ecommerce.order_header', []);
    await connection.$pool.end();
    return orderData.count
  }

  async clear() {
    const connection = pgp()("postgres://postgres:postgres123@localhost:5432/app");
    await connection.query('delete from ecommerce.order_header', []);
    await connection.query('delete from ecommerce.order_items', []);
    await connection.$pool.end();
  }
}