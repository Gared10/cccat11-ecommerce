import Checkout from "../usecase/Checkout";
import ListOrders from "../usecase/ListOrders";
import Usecase from "../usecase/Usecase";

export default interface UseCaseFactory {
  createCheckout(): Usecase;
  createListOrders(): Usecase;
}