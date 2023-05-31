import Product from "./Product";

export default class OrderItem {

  private quantity: number;
  private product: Product;

  constructor(quantity: number, product: Product) {
    if (quantity <= 0) throw new Error("Invalid quantity!");
    this.quantity = quantity;
    this.product = product;
  }

  getItemTotal() {
    return this.quantity * this.product.getPrice();
  }

  getDescription(): string {
    return this.product.getDescription();
  }

  getQuantity(): number {
    return this.quantity;
  }

  getPrice(): number {
    return this.product.getPrice();
  }

  getIdProduct(): number {
    return this.product.getIdProduct();
  }

  getMeasures() {
    return { weight: this.product.getMeasures().weight, height: this.product.getMeasures().height, width: this.product.getMeasures().width, product_length: this.product.getMeasures().product_length };
  }

  getProduct(): Product {
    return this.product;
  }

}