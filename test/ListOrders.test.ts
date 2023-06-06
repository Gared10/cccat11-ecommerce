import axios from "axios";
import ListOrders from "../src/ListOrders";
import crypto from 'crypto';
import Checkout from "../src/Checkout";
import OrderRepository from "../src/OrderRepository";
import OrderRepositoryDatabase from "../src/OrderRepositoryDatabase";

axios.defaults.validateStatus = function () {
  return true;
}

let checkout: Checkout;
let listOrders: ListOrders;
let orderRepository: OrderRepository

beforeEach(() => {
  checkout = new Checkout();
  orderRepository = new OrderRepositoryDatabase();
  listOrders = new ListOrders();
});


test("Should list all orders in database", async function () {
  await orderRepository.clear();
  const uuid = crypto.randomUUID();
  const uuid1 = crypto.randomUUID();
  const order = {
    id: uuid,
    cpf: "11144477735",
    items: [
      { "idProduct": 1, "quantity": 2 },
      { "idProduct": 2, "quantity": 5 },
      { "idProduct": 3, "quantity": 1 }
    ],
  }

  const order1 = {
    id: uuid1,
    cpf: "11144477735",
    items: [
      { "idProduct": 1, "quantity": 2 },
      { "idProduct": 2, "quantity": 5 },
      { "idProduct": 3, "quantity": 2 }
    ],
  }

  await checkout.execute(order);
  await checkout.execute(order1);
  const response = await listOrders.execute();
  expect(response.length).toBeGreaterThan(1);

})