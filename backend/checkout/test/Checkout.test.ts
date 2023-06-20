import axios from "axios";
import Checkout from "../src/application/usecase/Checkout";
import GetOrder from "../src/application/usecase/GetOrder";
import crypto from 'crypto';
import DatabaseRepositoryFactory from "../src/infra/factory/DatabaseRepositoryFactory";
import RepositoryFactory from "../src/application/usecase/interface/RepositoryFactory";
import DatabaseConnection from "../src/infra/database/DatabaseConnection";
import PgPromiseAdapter from "../src/infra/database/PgPromiseAdapter";

axios.defaults.validateStatus = function () {
  return true;
}

let checkout: Checkout;
let getOrder: GetOrder;
let repositoryFactory: RepositoryFactory;
let connection: DatabaseConnection;

beforeEach(async () => {
  connection = new PgPromiseAdapter();
  await connection.connect();
  repositoryFactory = new DatabaseRepositoryFactory(connection);
  checkout = new Checkout(repositoryFactory);
  getOrder = new GetOrder(repositoryFactory);
});

test('Should create an order with 3 items and calculate total amount', async function () {
  const uuid = crypto.randomUUID();
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

  const response = await checkout.execute(order);
  expect(response.getItems().length).toBe(3);
  expect(response.getTotal()).toBe(35000);
})

test('Should create an order with 3 items, associate discount coupon and calculate total amount(with discount over total amount)', async function () {
  const uuid = crypto.randomUUID();
  const order = {
    id: uuid,
    cpf: "11144477735",
    items: [
      { "idProduct": 1, "quantity": 2 },
      { "idProduct": 2, "quantity": 5 },
      { "idProduct": 3, "quantity": 1 }
    ],
    coupon: "VALE20_2",
    from: { CEP: "88015600", latitude: -27.5906685, longitude: -48.5605664 },
    to: { CEP: "22030060", latitude: -9.610394, longitude: -35.725652 }
  }

  const response = await checkout.execute(order);
  expect(response.getItems().length).toBe(3);
  expect(response.getTotal()).toBe(28000);
})

test('Should alert that the cpf is invalid and not create any order', async function () {
  const uuid = crypto.randomUUID();
  const order = {
    id: uuid,
    cpf: "12345678910",
    items: [
      { "idProduct": 1, "quantity": 2 },
      { "idProduct": 2, "quantity": 5 },
      { "idProduct": 3, "quantity": 1 }
    ],
    coupon: "VALE20_2",
    from: { CEP: "88015600", latitude: -27.5906685, longitude: -48.5605664 },
    to: { CEP: "22030060", latitude: -9.610394, longitude: -35.725652 }
  }

  await expect(() => checkout.execute(order)).rejects.toThrow(new Error('Invalid cpf'));
})

test('Should alert that the cpf is invalid and not create any order because cpf field is not filled in request data', async function () {
  const uuid = crypto.randomUUID();
  const order = {
    id: uuid,
    cpf: '',
    items: [
      { "idProduct": 1, "quantity": 2 },
      { "idProduct": 2, "quantity": 5 },
      { "idProduct": 3, "quantity": 1 }
    ],
    coupon: "VALE20_2",
    from: { CEP: "88015600", latitude: -27.5906685, longitude: -48.5605664 },
    to: { CEP: "22030060", latitude: -9.610394, longitude: -35.725652 }
  }

  await expect(() => checkout.execute(order)).rejects.toThrow(new Error('Invalid cpf'));
})

test("Should not apply expired discount coupon", async function () {
  const uuid = crypto.randomUUID();
  const order = {
    id: uuid,
    cpf: "11144477735",
    items: [
      { "idProduct": 1, "quantity": 2 },
      { "idProduct": 2, "quantity": 5 },
      { "idProduct": 3, "quantity": 1 }
    ],
    coupon: "VALE20",
    from: { CEP: "88015600", latitude: -27.5906685, longitude: -48.5605664 },
    to: { CEP: "22030060", latitude: -9.610394, longitude: -35.725652 }
  }

  const response = await checkout.execute(order);
  expect(response.getItems().length).toBe(3);
  expect(response.getTotal()).toBe(35000);
})

test("Should not apply inexistence discount coupon", async function () {
  const uuid = crypto.randomUUID();
  const order = {
    id: uuid,
    cpf: "11144477735",
    items: [
      { "idProduct": 1, "quantity": 2 },
      { "idProduct": 2, "quantity": 5 },
      { "idProduct": 3, "quantity": 1 }
    ],
    coupon: "VALE0",
    from: { CEP: "88015600", latitude: -27.5906685, longitude: -48.5605664 },
    to: { CEP: "22030060", latitude: -9.610394, longitude: -35.725652 }
  }

  const response = await checkout.execute(order);
  expect(response.getItems().length).toBe(3);
  expect(response.getTotal()).toBe(35000);
})

test("Should not create order with negative quantity item", async function () {
  const uuid = crypto.randomUUID();
  const order = {
    id: uuid,
    cpf: "11144477735",
    items: [
      { "idProduct": 1, "quantity": 2 },
      { "idProduct": 2, "quantity": -5 },
      { "idProduct": 3, "quantity": 1 }
    ],
    coupon: "VALE20",
    from: { CEP: "88015600", latitude: -27.5906685, longitude: -48.5605664 },
    to: { CEP: "22030060", latitude: -9.610394, longitude: -35.725652 }
  }

  await expect(() => checkout.execute(order)).rejects.toThrow(new Error('Invalid quantity!'));
})

test("Should not create order with duplicated items", async function () {
  const uuid = crypto.randomUUID();
  const order = {
    id: uuid,
    cpf: "11144477735",
    items: [
      { "idProduct": 1, "quantity": 2 },
      { "idProduct": 2, "quantity": 5 },
      { "idProduct": 2, "quantity": 5 },
      { "idProduct": 3, "quantity": 1 }
    ],
    coupon: "VALE20",
    from: { CEP: "88015600", latitude: -27.5906685, longitude: -48.5605664 },
    to: { CEP: "22030060", latitude: -9.610394, longitude: -35.725652 }
  }

  await expect(() => checkout.execute(order)).rejects.toThrow(new Error('Duplicated item!'));
})

test('Should create an order with 3 items, associate discount coupon and calculate total amount(with discount over total amount)', async function () {
  const uuid = crypto.randomUUID();
  const order = {
    id: uuid,
    cpf: "11144477735",
    items: [
      { "idProduct": 1, "quantity": 2 },
      { "idProduct": 2, "quantity": 5 },
      { "idProduct": 3, "quantity": 1 }
    ],
    coupon: "VALE20_2",
    from: { CEP: "88015600", latitude: -27.5906685, longitude: -48.5605664 },
    to: { CEP: "22030060", latitude: -9.610394, longitude: -35.725652 }
  }

  const response = await checkout.execute(order);
  expect(response.getItems().length).toBe(3);
  expect(response.getTotal()).toBe(28000);
  expect(response.getTotalFare()).toBe(1060)
})

test('Should create and persist an order', async function () {
  const orderRepository = repositoryFactory.createOrderRepository();
  await orderRepository.clear();
  const uuid = crypto.randomUUID();
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

  await checkout.execute(order);
  const response = await getOrder.execute(uuid);
  expect(response.getItems().length).toBe(3);
  expect(response.getTotal()).toBe(35000);
  expect(response.getTotalFare()).toBe(1060)
  expect(response.getCode()).toBe("202300000001")

  const order_id2 = crypto.randomUUID();
  const order2 = {
    id: order_id2,
    cpf: "11144477735",
    items: [
      { "idProduct": 1, "quantity": 2 },
      { "idProduct": 2, "quantity": 5 },
      { "idProduct": 3, "quantity": 1 }
    ],
    from: { CEP: "88015600", latitude: -27.5906685, longitude: -48.5605664 },
    to: { CEP: "22030060", latitude: -9.610394, longitude: -35.725652 }
  }

  await checkout.execute(order2);
  const order2_ = await getOrder.execute(order_id2);
  expect(order2_.getItems().length).toBe(3);
  expect(order2_.getTotal()).toBe(35000);
  expect(order2_.getTotalFare()).toBe(1060)
  expect(order2_.getCode()).toBe("202300000002")
})

afterEach(async () => {
  await connection.close();
})