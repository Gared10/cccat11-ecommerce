import Order from "./Order";
import OrderRepository from "./OrderRepository";
import OrderRepositoryDatabase from "./OrderRepositoryDatabase";
import RepositoryFactory from "./RepositoryFactory";

export default class GetOrder {
  orderRepository: OrderRepository

  constructor(
    repositoryFactory: RepositoryFactory
  ) {
    this.orderRepository = repositoryFactory.createOrderRepository();
  }

  async execute(uuid: string): Promise<Order> {
    const orderData = await this.orderRepository.get(uuid);
    return orderData;
  }
}

