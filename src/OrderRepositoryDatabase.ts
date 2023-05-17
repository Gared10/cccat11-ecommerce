import Order from "./Order";
import pgp from "pg-promise";
import OrderRepository from "./OrderRepository";
import ProductRepositoryDatabase from "./ProductRepositoryDatabase";
import Product from "./Product";

export default class OrderRepositoryDatabase implements OrderRepository {

  async get(idOrder: string) {
    const connection = pgp()("postgres://postgres:postgres123@localhost:5432/app");
    const [orderData] = await connection.query('select * from ecommerce.order_header where id_order = $1', [idOrder]);
    const [orderItemsData] = await connection.query('select * from ecommerce.order_items where id_order = $1', [idOrder]);
    const order = new Order(orderData.cpf, orderData.id_order)
    console.log(orderData)
    console.log(orderItemsData)
    for (const item of orderItemsData) {
      const [productData] = await connection.query("select id_product, description, price, width, height, weight, product_length from ecommerce.product where id_product = $1", [item.id_product]);
      const product = new Product(productData.description, productData.price, productData.id_product, productData.height, productData.weight, productData.width, productData.product_length)
      order.addOrderItem(item.quantity, product)
    }

    const output = {
      total: order.getTotal(),
      fare: order.getTotalFare(),
      message: '',
      items: order.getItems().length
    }

    await connection.$pool.end();
    return output;
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
}