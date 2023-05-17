import OrderRepositoryDatabase from "./OrderRepositoryDatabase";

export default class GetOrder {

  constructor(
    readonly orderRepository: OrderRepositoryDatabase = new OrderRepositoryDatabase
  ) {

  }

  async execute(uuid: string): Promise<Output> {
    const orderData = await this.orderRepository.get(uuid);
    return orderData;
  }
}

type Output = {
  total: number,
  fare: number,
  message: string,
  items: number
}

