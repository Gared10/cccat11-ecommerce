

import Order from "../../domain/entity/Order";
import { validate } from "../../domain/entity/validateCPF";
import GatewayFactory from "../factory/GatewayFactory";
import RepositoryFactory from "../factory/RepositoryFactory";
import CatalogGateway from "../gateway/CatalogGateway";
import FareGateway from "../gateway/FareGateway";
import CouponRepository from "../repository/CouponRespository";
import LocationRepository from "../repository/LocationRepository";
import OrderRepository from "../repository/OrderRepository";
import ProductRepository from "../repository/ProductRepository";

export default class Checkout {
  orderRepository: OrderRepository;
  productRepository: ProductRepository;
  couponRepository: CouponRepository;
  locationRepository: LocationRepository;
  catalogGateway: CatalogGateway;
  fareGateway: FareGateway;

  constructor(
    repositoryFactory: RepositoryFactory,
    gatewayFactory: GatewayFactory
  ) {
    this.orderRepository = repositoryFactory.createOrderRepository();
    this.productRepository = repositoryFactory.createProductRepository();
    this.couponRepository = repositoryFactory.createCouponRepository();
    this.locationRepository = repositoryFactory.createLocationRepository();
    this.catalogGateway = gatewayFactory.createCatalogGateway();
    this.fareGateway = gatewayFactory.createFareGateway()
  }

  async execute(input: Input): Promise<Order> {
    let order: Order
    if (!validate(input.cpf)) throw new Error('Invalid cpf');
    let sequence = await this.orderRepository.count()
    sequence++;
    const fromCEP = await this.fareGateway.getLocation(input.from.CEP)
    const toCEP = await this.fareGateway.getLocation(input.to.CEP)
    order = new Order(input.cpf, input.id, fromCEP, toCEP, undefined, sequence)
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
    if (order.getItems().length > 0) await this.orderRepository.save(order);
    return order;
  }

}

type Input = {
  id: string,
  cpf: string,
  items: { idProduct: number, quantity: number }[],
  coupon?: string,
  from: { CEP: string, latitude: number, longitude: number },
  to: { CEP: string, latitude: number, longitude: number }
}