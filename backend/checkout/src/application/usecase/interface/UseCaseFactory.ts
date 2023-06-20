import Checkout from "../Checkout";
import ListOrders from "../ListOrders";
import RepositoryFactory from "./RepositoryFactory";
import SimulateFare from "../SimulateFare";

export default interface UseCaseFactory {
  createCheckout(): Checkout;
  createListOrders(): ListOrders;
  createSimulateFare(): SimulateFare;
}