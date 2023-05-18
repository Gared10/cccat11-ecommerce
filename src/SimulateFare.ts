import ProductRepository from "./ProductRepository";
import ProductRepositoryDatabase from "./ProductRepositoryDatabase";
import { calculateFare } from "./calculateFare";

export default class SimulateFare {

  constructor(
    readonly productRepository: ProductRepository = new ProductRepositoryDatabase
  ) {

  }

  async execute(input: Input): Promise<Output> {
    let output = {
      fare: 0
    }
    if (input.from && input.to) {
      for (const item of input.items) {
        const productData = await this.productRepository.get(item.idProduct)
        output.fare += calculateFare(productData.height, productData.width, productData.product_length, productData.weight)
      }
    }
    return output;
  }
}

type Input = {
  items: { idProduct: number, quantity: number }[],
  from: string,
  to: string
}

type Output = {
  fare: number
}