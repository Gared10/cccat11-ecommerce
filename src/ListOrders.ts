import Order from "./Order";
import OrderRepository from "./OrderRepository";
import OrderRepositoryDatabase from "./OrderRepositoryDatabase";
import RepositoryFactory from "./RepositoryFactory";

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

