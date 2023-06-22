import Order from "../../domain/entity/Order";
import RepositoryFactory from "../factory/RepositoryFactory";
import OrderRepository from "../repository/OrderRepository";

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

