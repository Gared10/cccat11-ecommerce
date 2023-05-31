

import Order from "./Order";
import { validate } from "./validateCPF";
import ProductRepository from "./ProductRepository";
import CouponRepository from "./CouponRespository";
import ProductRepositoryDatabase from "./ProductRepositoryDatabase";
import CouponRepositoryDatabase from "./CouponRepositoryDatabase";
import Product from "./Product";
import OrderRepository from "./OrderRepository";
import OrderRepositoryDatabase from "./OrderRepositoryDatabase";

export default class Checkout {

  constructor(
    readonly productRepository: ProductRepository = new ProductRepositoryDatabase,
    readonly couponRepository: CouponRepository = new CouponRepositoryDatabase,
    readonly orderRepository: OrderRepository = new OrderRepositoryDatabase
  ) {

  }

  async execute(input: Input): Promise<Output> {
    const output: Output = {
      total: 0,
      fare: 0,
      message: '',
      items: 0
    }
    let order: Order
    if (!validate(input.cpf)) throw new Error('Invalid cpf');
    let sequence = await this.orderRepository.count()
    sequence++;
    order = new Order(input.cpf, input.id, undefined, sequence)
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
    output.total = order.getTotal();
    output.fare = order.getTotalFare();
    output.items = order.getItems().length;
    await this.orderRepository.save(order);
    return output;
  }

}

type Input = {
  id: string,
  cpf: string,
  items: { idProduct: number, quantity: number }[],
  coupon?: string,
  from?: string,
  to?: string
}

type Output = {
  total: number,
  fare: number,
  message: string,
  items: number
}