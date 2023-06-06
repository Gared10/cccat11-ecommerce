import Order from "./Order";
import OrderRepository from "./OrderRepository";
import OrderRepositoryDatabase from "./OrderRepositoryDatabase";

export default class ListOrders {

  constructor(
    readonly orderRepository: OrderRepository = new OrderRepositoryDatabase
  ) {

  }

  async execute(): Promise<Order[]> {
    const orderData: Order[] = await this.orderRepository.list();
    return orderData;
  }
}

