import OrderItem from "./OrderItem"

export default class Order {
  private cpf: string
  private items: OrderItem[] | undefined

  constructor(cpf: string, items?: OrderItem[]) {
    this.items = items
    this.cpf = cpf
  }

  addOrderItem(description: string, quantity: number, price: number) {
    const product = new OrderItem(description, quantity, price);
    return this.items ? this.items.push(product) : this.items = [product];
  }

  getItems(): OrderItem[] {
    return this.items ? this.items : [];
  }

  getTotal() {
    let totalAmount: number = 0
    this.items?.map((item: OrderItem) => {
      totalAmount += item.getItemTotal();
    })
    return totalAmount;
  }

  getCpf() {
    return this.cpf
  }

  setItems(items: OrderItem[]): void {
    this.items = items;
  }


}