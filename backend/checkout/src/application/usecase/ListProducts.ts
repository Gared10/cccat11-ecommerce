

import ProductRepository from "./interface/ProductRepository";
import RepositoryFactory from "./interface/RepositoryFactory";

export default class ListProducts {
  productRepository: ProductRepository;

  constructor(
    repositoryFactory: RepositoryFactory
  ) {
    this.productRepository = repositoryFactory.createProductRepository();
  }

  async execute(): Promise<Output[]> {
    const productsData = await this.productRepository.list()
    let products = []
    for (const product of productsData) {
      products.push(Object.assign(product, { volume: product.getVolume(), density: product.getDensity() }))
    }
    return products;
  }

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