import Order from "../../domain/entity/Order";
import GatewayFactory from "../factory/GatewayFactory";
import RepositoryFactory from "../factory/RepositoryFactory";
import FareGateway from "../gateway/FareGateway";
import OrderRepository from "../repository/OrderRepository";

export default class GetOrder {
  orderRepository: OrderRepository
  fareGateway: FareGateway;

  constructor(
    repositoryFactory: RepositoryFactory,
    gatewayFactory: GatewayFactory
  ) {
    this.orderRepository = repositoryFactory.createOrderRepository();
    this.fareGateway = gatewayFactory.createFareGateway();
  }

  async execute(uuid: string): Promise<Output> {
    const orderData = await this.orderRepository.get(uuid);
    let items = [];
    for (const item of orderData.getItems()) {
      items.push({ idProduct: item.getIdProduct(), quantity: item.getQuantity() });
    }
    const fareData = { items: items, from: orderData.getFromCEP(), to: orderData.getToCEP() }
    const totalFare = await this.fareGateway.simulateFare(fareData);
    orderData.setTotalFare(totalFare)
    const output = {
      id: orderData.getId(),
      cpf: orderData.getCpf(),
      code: orderData.getCode(),
      items: items,
      from: orderData.getFromCEP(),
      to: orderData.getToCEP(),
      total: orderData.getTotal(),
      totalFare: orderData.getTotalFare()
    }
    return output;
  }
}

type Output = {
  id: string,
  cpf: string,
  code: string,
  items: { idProduct: number, quantity: number }[],
  coupon?: string,
  from: string,
  to: string,
  total: number,
  totalFare: number
}

