import Order from "../../domain/entity/Order";
export default interface OrderRepository {
  get(order: string): Promise<Order>;
  save(order: Order): Promise<void>;
  count(): Promise<number>;
  clear(): Promise<void>;
  list(): Promise<Order[]>;
}