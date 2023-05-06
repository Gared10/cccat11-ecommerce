export default class OrderItem {

  private description: string;
  private quantity: number;
  private price: number;
  private idProduct: number;

  constructor(description: string, quantity: number, price: number, idProdutct: number) {
    this.description = description;
    this.price = price;
    this.quantity = quantity;
    this.idProduct = idProdutct;
  }

  getItemTotal() {
    return this.quantity * this.price;
  }

  getDescription(): string {
    return this.description;
  }

  getQuantity(): number {
    return this.quantity;
  }

  getPrice(): number {
    return this.price;
  }

  getIdProduct(): number {
    return this.idProduct;
  }

}