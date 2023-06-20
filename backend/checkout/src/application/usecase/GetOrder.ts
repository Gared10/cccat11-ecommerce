import Order from "../../domain/entity/Order";
import OrderRepository from "./interface/OrderRepository";
import OrderRepositoryDatabase from "../../infra/repository/OrderRepositoryDatabase";
import RepositoryFactory from "./interface/RepositoryFactory";

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

