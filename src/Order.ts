import OrderItem from "./OrderItem"
import Product from "./Product"
import { calculateFare } from "./calculateFare"

export default class Order {
  private cpf: string;
  private id: string;
  private code: string;
  private items: OrderItem[] | undefined;

  constructor(cpf: string, id: string, code?: string, sequence?: number, items?: OrderItem[]) {
    this.items = items;
    this.cpf = cpf;
    this.id = id;
    this.code = code ?? this.generateCode(sequence ?? 1);
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

  getId() {
    return this.id;
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

  generateCode(sequence: number) {
    const today = new Date();
    const code = `${today.getFullYear()}${new String(sequence).padStart(8, "0")}`
    return code;
  }

  getCode() {
    return this.code;
  }
}