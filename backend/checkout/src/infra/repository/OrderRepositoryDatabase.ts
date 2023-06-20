import Order from "../../domain/entity/Order";
import pgp from "pg-promise";
import OrderRepository from "../../application/usecase/interface/OrderRepository";
import ProductRepositoryDatabase from "./ProductRepositoryDatabase";
import ProductRepository from "../../application/usecase/interface/ProductRepository";
import LocationRepository from "../../application/usecase/interface/LocationRepository";
import LocationRepositoryDatabase from "./LocationRepositoryDatabase";
import DatabaseConnection from "../database/DatabaseConnection";
import RepositoryFactory from "../../application/usecase/interface/RepositoryFactory";

export default class OrderRepositoryDatabase implements OrderRepository {

  constructor(readonly productRepository: ProductRepository, readonly locationRepository: LocationRepository, readonly connection: DatabaseConnection) {
    this.productRepository = productRepository;
    this.locationRepository = locationRepository;
  }

  async get(idOrder: string) {
    const [orderData] = await this.connection.query('select * from ecommerce.order_header where id_order = $1', [idOrder]);
    const orderItemsData = await this.connection.query('select * from ecommerce.order_items where id_order = $1', [idOrder]);
    const fromCEP = await this.locationRepository.get(orderData.fromcep)
    const toCEP = await this.locationRepository.get(orderData.tocep)
    const order = new Order(orderData.cpf, orderData.id_order, fromCEP, toCEP, orderData.code)
    for (const item of orderItemsData) {
      const product = await this.productRepository.get(item.id_product);
      order.addOrderItem(item.quantity, product);
    }
    return order;
  }

  async list(): Promise<Order[]> {
    let orders: Order[] = []
    const orderData = await this.connection.query('select * from ecommerce.order_header order by id_order');
    const orderItemsData = await this.connection.query('select * from ecommerce.order_items order by id_order');
    for (const orderHeader of orderData) {
      const fromCEP = await this.locationRepository.get(orderHeader.fromcep)
      const toCEP = await this.locationRepository.get(orderHeader.tocep)
      const order: Order = new Order(orderHeader.cpf, orderHeader.id_order, fromCEP, toCEP, orderHeader.code)
      for (const item of orderItemsData) {
        if (item.id_order === order.getId()) {
          const product = await this.productRepository.get(item.id_product);
          order.addOrderItem(item.quantity, product);
        }
      }
      if (order.getItems().length > 0) orders.push(order);
    }
    return orders
  }

  async save(order: Order) {
    for (const item of order.getItems()) {
      await this.connection.query('insert into ecommerce.order_items(id_product, id_order, quantity, price) values ($1, $2, $3, $4)', [item.getIdProduct(), order.getId(), item.getQuantity(), item.getPrice()])
    }
    const [orderInstance] = await this.connection.query('insert into ecommerce.order_header(id_order, code, cpf, fromcep, tocep) values ($1, $2, $3, $4, $5)', [order.getId(), order.getCode(), order.getCpf(), order.getFromCEP(), order.getToCEP()])
  }

  async count() {
    const [orderData] = await this.connection.query('select count(1) from ecommerce.order_header');
    return parseInt(orderData.count)
  }

  async clear() {
    await this.connection.query('delete from ecommerce.order_header');
    await this.connection.query('delete from ecommerce.order_items');
  }
}