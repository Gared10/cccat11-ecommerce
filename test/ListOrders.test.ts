import axios from "axios";
import ListOrders from "../src/ListOrders";
import crypto from 'crypto';
import Checkout from "../src/Checkout";
import DatabaseRepositoryFactory from "../src/DatabaseRepositoryFactory";
import RepositoryFactory from "../src/RepositoryFactory";
import DatabaseConnection from "../src/DatabaseConnection";
import PgPromiseAdapter from "../src/PgPromiseAdapter";

axios.defaults.validateStatus = function () {
  return true;
}

let checkout: Checkout;
let listOrders: ListOrders;
let repositoryFactory: RepositoryFactory;
let connection: DatabaseConnection;

beforeEach(async () => {
  connection = new PgPromiseAdapter();
  await connection.connect();
  repositoryFactory = new DatabaseRepositoryFactory(connection);
  checkout = new Checkout(repositoryFactory);
  listOrders = new ListOrders(repositoryFactory);
});


test("Should list all orders in database", async function () {
  const orderRepository = repositoryFactory.createOrderRepository();
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
    from: { CEP: "88015600", latitude: -27.5906685, longitude: -48.5605664 },
    to: { CEP: "22030060", latitude: -9.610394, longitude: -35.725652 }
  }

  const order1 = {
    id: uuid1,
    cpf: "11144477735",
    items: [
      { "idProduct": 1, "quantity": 2 },
      { "idProduct": 2, "quantity": 5 },
      { "idProduct": 3, "quantity": 2 }
    ],
    from: { CEP: "88015600", latitude: -27.5906685, longitude: -48.5605664 },
    to: { CEP: "22030060", latitude: -9.610394, longitude: -35.725652 }
  }

  await checkout.execute(order);
  await checkout.execute(order1);
  const response = await listOrders.execute();
  expect(response.length).toBeGreaterThan(1);

})

afterEach(async () => {
  await connection.close();
})