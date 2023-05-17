
import pgp from "pg-promise";
import OrderItem from "./OrderItem";
import Order from "./Order";
import { validate } from "./validateCPF";
import ProductRepository from "./ProductRepository";
import CouponRepository from "./CouponRespository";
import ProductRepositoryDatabase from "./ProductRepositoryDatabase";
import CouponRepositoryDatabase from "./CouponRepositoryDatabase";

export default class Checkout {

  constructor(
    readonly productRepository: ProductRepository = new ProductRepositoryDatabase,
    readonly couponRepository: CouponRepository = new CouponRepositoryDatabase
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
    if (input.items) {
      order = new Order(input.cpf)
      for (const item of input.items) {
        if (item.quantity <= 0) throw new Error("Invalid quantity!");
        const productData = await this.productRepository.get(item.idProduct);
        if (order.getItems().find(element => element.getIdProduct() === item.idProduct)) throw new Error("Order with duplicated items!");
        if (productData.height <= 0 || productData.width <= 0 || productData.product_length <= 0 || productData.weight <= 0) throw new Error("Order has items with negative measures!");
        order.addOrderItem(productData.description, item.quantity, productData.price, item.idProduct, productData.height, productData.weight, productData.width, productData.product_length);
      }
      output.total = order.getTotal();
      output.fare = order.getTotalFare();
      output.items = order.getItems().length;
      if (input.coupon && output.items > 0) {
        const couponData = await this.couponRepository.get(input.coupon);
        const nowDate: Date = new Date();
        if (couponData && couponData.expiration_date.getTime() > nowDate.getTime()) {
          output.total -= order.getTotal() * (parseFloat(couponData.percentage) / 100);
        }
      }
    }
    return output;
  }

}

type Input = {
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