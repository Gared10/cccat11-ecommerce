export default class Product {

  private description: string;
  private price: number;
  private idProduct: number;
  private height: number;
  private weight: number;
  private width: number;
  private product_length: number;

  constructor(description: string, price: number, idProduct: number, height: number, weight: number, width: number, product_length: number) {
    this.description = description;
    this.price = price;
    this.idProduct = idProduct;
    this.height = height;
    this.weight = weight;
    this.width = width;
    this.product_length = product_length;
  }

  getDescription(): string {
    return this.description;
  }

  getPrice(): number {
    return this.price;
  }

  getIdProduct(): number {
    return this.idProduct;
  }

  getMeasures() {
    return { weight: this.weight, height: this.height, width: this.width, product_length: this.product_length };
  }

}