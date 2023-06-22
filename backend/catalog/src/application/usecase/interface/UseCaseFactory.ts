import GetProduct from "../GetProduct";
import ListProducts from "../ListProducts";

export default interface UseCaseFactory {
  createGetProduct(): GetProduct;
  createListProducts(): ListProducts;
}