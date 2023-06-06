

import Order from "./Order";
import { validate } from "./validateCPF";
import ProductRepository from "./ProductRepository";
import CouponRepository from "./CouponRespository";
import ProductRepositoryDatabase from "./ProductRepositoryDatabase";
import CouponRepositoryDatabase from "./CouponRepositoryDatabase";
import OrderRepository from "./OrderRepository";
import OrderRepositoryDatabase from "./OrderRepositoryDatabase";
import LocationRepository from "./LocationRepository";
import LocationRepositoryDatabase from "./LocationRepositoryDatabase";

export default class Checkout {

  constructor(
    readonly productRepository: ProductRepository = new ProductRepositoryDatabase,
    readonly couponRepository: CouponRepository = new CouponRepositoryDatabase,
    readonly orderRepository: OrderRepository = new OrderRepositoryDatabase,
    readonly locationRepository: LocationRepository = new LocationRepositoryDatabase
  ) {

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