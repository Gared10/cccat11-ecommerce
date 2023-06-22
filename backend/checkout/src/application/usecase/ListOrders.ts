import Order from "../../domain/entity/Order";
import RepositoryFactory from "../factory/RepositoryFactory";
import OrderRepository from "../repository/OrderRepository";

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

