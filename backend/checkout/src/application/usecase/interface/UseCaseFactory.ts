import Checkout from "../Checkout";
import ListOrders from "../ListOrders";
import RepositoryFactory from "./RepositoryFactory";
import SimulateFare from "../SimulateFare";
import GetProduct from "../GetProduct";
import ListProducts from "../ListProducts";

export default interface UseCaseFactory {
  createCheckout(): Checkout;
  createListOrders(): ListOrders;
  createSimulateFare(): SimulateFare;
  createGetProduct(): GetProduct;
  createListProducts(): ListProducts;
}