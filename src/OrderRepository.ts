import Order from "./Order";

export default interface OrderRepository {
  get(order: string): Promise<any>;
  save(order: Order): Promise<void>;
  count(): Promise<any>;
  clear(): Promise<void>;
}