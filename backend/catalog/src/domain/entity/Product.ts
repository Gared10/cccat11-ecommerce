export default class Product {

  constructor(readonly description: string, readonly price: number, readonly idProduct: number, readonly height: number, readonly weight: number, readonly width: number, readonly product_length: number) {
    if (height <= 0 || width <= 0 || product_length <= 0 || weight <= 0) {
      throw new Error('Invalid measures!');
    }
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

  getVolume() {
    return this.height * this.width * this.product_length;
  }

  getDensity() {
    return this.weight / this.getVolume();
  }

}