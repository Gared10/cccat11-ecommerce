import Checkout from "../usecase/Checkout";
import ListOrders from "../usecase/ListOrders";

export default interface UseCaseFactory {
  createCheckout(): Checkout;
  createListOrders(): ListOrders;
}