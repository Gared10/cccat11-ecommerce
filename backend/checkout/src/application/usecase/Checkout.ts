

import Order from "../../domain/entity/Order";
import { validate } from "../../domain/entity/validateCPF";
import GatewayFactory from "../factory/GatewayFactory";
import RepositoryFactory from "../factory/RepositoryFactory";
import AuthGateway from "../gateway/AuthGateway";
import CatalogGateway from "../gateway/CatalogGateway";
import FareGateway from "../gateway/FareGateway";
import CouponRepository from "../repository/CouponRespository";
import OrderRepository from "../repository/OrderRepository";
import ProductRepository from "../repository/ProductRepository";

export default class Checkout {
  orderRepository: OrderRepository;
  productRepository: ProductRepository;
  couponRepository: CouponRepository;
  catalogGateway: CatalogGateway;
  fareGateway: FareGateway;
  authGateway: AuthGateway;

  constructor(
    repositoryFactory: RepositoryFactory,
    gatewayFactory: GatewayFactory
  ) {
    this.orderRepository = repositoryFactory.createOrderRepository();
    this.productRepository = repositoryFactory.createProductRepository();
    this.couponRepository = repositoryFactory.createCouponRepository();
    this.catalogGateway = gatewayFactory.createCatalogGateway();
    this.fareGateway = gatewayFactory.createFareGateway();
    this.authGateway = gatewayFactory.createAuthGateway();
  }

  async execute(input: Input): Promise<Output> {
    const session = await this.authGateway.verify(input.token);
    if (!session) throw new Error("Authentication failed");
    let order: Order
    if (!validate(input.cpf)) throw new Error('Invalid cpf');
    let sequence = await this.orderRepository.count()
    sequence++;
    const fromCEP = await this.fareGateway.getLocation(input.from.CEP)
    const toCEP = await this.fareGateway.getLocation(input.to.CEP)
    order = new Order(input.cpf, input.id, fromCEP.CEP, toCEP.CEP, undefined, sequence)
    for (const item of input.items) {
      const product = await this.catalogGateway.getProduct(item.idProduct);
      order.addOrderItem(item.quantity, product);
    }
    if (input.coupon) {
      const coupon = await this.couponRepository.get(input.coupon);
      if (coupon) {
        order.addCoupon(coupon);
      }
    }
    let items = [];
    for (const item of order.getItems()) {
      items.push({ idProduct: item.getIdProduct(), quantity: item.getQuantity() });
    }
    const fareData = { items: items, from: fromCEP.CEP, to: toCEP.CEP };
    const totalFare = await this.fareGateway.simulateFare(fareData);
    order.setTotalFare(totalFare)
    if (order.getItems().length > 0) await this.orderRepository.save(order);
    const output = {
      id: order.getId(),
      cpf: order.getCpf(),
      code: order.getCode(),
      items: items,
      from: order.getFromCEP(),
      to: order.getToCEP(),
      total: order.getTotal(),
      totalFare: order.getTotalFare()
    }
    return output;
  }

}

type Input = {
  id: string,
  cpf: string,
  items: { idProduct: number, quantity: number }[],
  coupon?: string,
  from: { CEP: string, latitude: number, longitude: number },
  to: { CEP: string, latitude: number, longitude: number },
  token: string
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