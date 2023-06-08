

import Order from "./Order";
import { validate } from "./validateCPF";
import ProductRepository from "./ProductRepository";
import CouponRepository from "./CouponRespository";
import OrderRepository from "./OrderRepository";
import LocationRepository from "./LocationRepository";
import RepositoryFactory from "./RepositoryFactory";

export default class Checkout {
  orderRepository: OrderRepository;
  productRepository: ProductRepository;
  couponRepository: CouponRepository;
  locationRepository: LocationRepository;

  constructor(
    repositoryFactory: RepositoryFactory
  ) {
    this.orderRepository = repositoryFactory.createOrderRepository();
    this.productRepository = repositoryFactory.createProductRepository();
    this.couponRepository = repositoryFactory.createCouponRepository();
    this.locationRepository = repositoryFactory.createLocationRepository();
  }

  async execute(input: Input): Promise<Order> {
    let order: Order
    if (!validate(input.cpf)) throw new Error('Invalid cpf');
    let sequence = await this.orderRepository.count()
    sequence++;
    const fromCEP = await this.locationRepository.get(input.from.CEP)
    const toCEP = await this.locationRepository.get(input.to.CEP)
    order = new Order(input.cpf, input.id, fromCEP, toCEP, undefined, sequence)
    for (const item of input.items) {
      const product = await this.productRepository.get(item.idProduct);
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