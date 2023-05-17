import OrderItem from "./OrderItem"
import Product from "./Product"
import { calculateFare } from "./calculateFare"

export default class Order {
  private cpf: string
  private items: OrderItem[] | undefined

  constructor(cpf: string, items?: OrderItem[]) {
    this.items = items
    this.cpf = cpf
  }

  addOrderItem(quantity: number, product: Product): number | OrderItem[] {
    const item = new OrderItem(quantity, product);
    return this.items ? this.items.push(item) : this.items = [item];
  }

  getItems(): OrderItem[] {
    return this.items ? this.items : [];
  }

  getTotal(): number {
    let totalAmount: number = 0
    this.items?.map((item: OrderItem) => {
      totalAmount += item.getItemTotal();
    })
    return totalAmount;
  }

  getCpf(): string {
    return this.cpf
  }

  setItems(items: OrderItem[]): void {
    this.items = items;
  }

  getTotalFare(): number {
    const items: OrderItem[] = this.items ?? [];
    let fare: number = 0;
    for (const item of items) {
      let productMeasures = item.getMeasures()
      fare += calculateFare(productMeasures.height, productMeasures.width, productMeasures.product_length, productMeasures.weight)
    }
    return fare
  }
}