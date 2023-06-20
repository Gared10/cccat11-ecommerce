import Order from "../../domain/entity/Order";
import OrderRepository from "./interface/OrderRepository";
import OrderRepositoryDatabase from "../../infra/repository/OrderRepositoryDatabase";
import RepositoryFactory from "./interface/RepositoryFactory";

export default class ListOrders {
  orderRepository: OrderRepository

  constructor(
    repositoryFactory: RepositoryFactory
  ) {
    this.orderRepository = repositoryFactory.createOrderRepository();
  }

  async execute(): Promise<Order[]> {
    const orderData: Order[] = await this.orderRepository.list();
    return orderData;
  }
}

