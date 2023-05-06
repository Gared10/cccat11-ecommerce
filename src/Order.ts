import OrderItem from "./OrderItem"
import { calculateFare } from "./calculateFare"

export default class Order {
  private cpf: string
  private items: OrderItem[] | undefined

  constructor(cpf: string, items?: OrderItem[]) {
    this.items = items
    this.cpf = cpf
  }

  addOrderItem(description: string, quantity: number, price: number, idProduct: number, height: number, weight: number, width: number, product_length: number): number | OrderItem[] {
    const product = new OrderItem(description, quantity, price, idProduct, height, weight, width, product_length);
    return this.items ? this.items.push(product) : this.items = [product];
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