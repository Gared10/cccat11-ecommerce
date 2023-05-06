import OrderItem from "./OrderItem"

export default class Order {
  private cpf: string
  private items: OrderItem[] | undefined

  constructor(cpf: string, items?: OrderItem[]) {
    this.items = items
    this.cpf = cpf
  }

  addOrderItem(description: string, quantity: number, price: number, idProduct: number): number | OrderItem[] {
    const product = new OrderItem(description, quantity, price, idProduct);
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


}