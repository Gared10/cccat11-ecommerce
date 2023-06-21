

import ProductRepository from "./interface/ProductRepository";
import RepositoryFactory from "./interface/RepositoryFactory";

export default class GetProduct {
  productRepository: ProductRepository;

  constructor(
    repositoryFactory: RepositoryFactory
  ) {
    this.productRepository = repositoryFactory.createProductRepository();
  }

  async execute(input: Input): Promise<Output> {
    const product = await this.productRepository.get(input.id)
    return Object.assign(product, {
      volume: product.getVolume(),
      density: product.getDensity()
    });
  }

}

type Input = {
  id: number
}

type Output = {
  idProduct: number,
  description: string,
  price: number,
  height: number,
  weight: number,
  width: number,
  product_length: number,
  volume: number,
  density: number
}