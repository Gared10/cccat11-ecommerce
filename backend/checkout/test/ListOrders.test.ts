import axios from "axios";
import ListOrders from "../src/application/usecase/ListOrders";
import crypto from 'crypto';
import Checkout from "../src/application/usecase/Checkout";
import DatabaseRepositoryFactory from "../src/infra/factory/DatabaseRepositoryFactory";
import RepositoryFactory from "../src/application/factory/RepositoryFactory";
import DatabaseConnection from "../src/infra/database/DatabaseConnection";
import PgPromiseAdapter from "../src/infra/database/PgPromiseAdapter";
import GatewayFactory from "../src/application/factory/GatewayFactory";
import AxiosHttpClient from "../src/infra/http/AxiosHttpClient";
import GatewayHttpFactory from "../src/infra/factory/GatewayHttpFactory";

axios.defaults.validateStatus = function () {
  return true;
}

let checkout: Checkout;
let listOrders: ListOrders;
let repositoryFactory: RepositoryFactory;
let connection: DatabaseConnection;
let gatewayFactory: GatewayFactory;
let httpClient: AxiosHttpClient;

beforeEach(async () => {
  connection = new PgPromiseAdapter();
  await connection.connect();
  repositoryFactory = new DatabaseRepositoryFactory(connection);
  httpClient = new AxiosHttpClient();
  gatewayFactory = new GatewayHttpFactory(httpClient);
  checkout = new Checkout(repositoryFactory, gatewayFactory);
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
    to: { CEP: "22030060", latitude: -9.610394, longitude: -35.725652 },
    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImpvYW9AZ21haWwuY29tIiwiaWF0IjoxNjc3Njc1NjAwMDAwLCJleHBpcmVzSW4iOjEwMDAwMDB9.UkLW3l3gaIW7U0JGpZnDUZTbE_fHtDLd-eI9yV0_C8s"
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
    to: { CEP: "22030060", latitude: -9.610394, longitude: -35.725652 },
    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImpvYW9AZ21haWwuY29tIiwiaWF0IjoxNjc3Njc1NjAwMDAwLCJleHBpcmVzSW4iOjEwMDAwMDB9.UkLW3l3gaIW7U0JGpZnDUZTbE_fHtDLd-eI9yV0_C8s"
  }

  await checkout.execute(order);
  await checkout.execute(order1);
  const response = await listOrders.execute();
  expect(response.length).toBeGreaterThan(1);

})

afterEach(async () => {
  await connection.close();
})