import Order from "./Order";
import OrderRepositoryDatabase from "./OrderRepositoryDatabase";

export default class GetOrder {

  constructor(
    readonly orderRepository: OrderRepositoryDatabase = new OrderRepositoryDatabase
  ) {

  }

  async execute(uuid: string): Promise<Order> {
    const orderData = await this.orderRepository.get(uuid);
    return orderData;
  }
}

