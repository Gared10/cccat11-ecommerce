import axios from "axios";
import Checkout from "../src/Checkout";
import ProductRepositoryDatabase from "../src/ProductRepositoryDatabase";
import CouponRepositoryDatabase from "../src/CouponRepositoryDatabase";
import OrderRepositoryDatabase from "../src/OrderRepositoryDatabase";
import GetOrder from "../src/GetOrder";
import crypto from 'crypto';
import OrderRepository from "../src/OrderRepository";

axios.defaults.validateStatus = function () {
  return true;
}

let checkout: Checkout;
let getOrder: GetOrder;
let orderRepository: OrderRepository

beforeEach(() => {
  const productRepository = new ProductRepositoryDatabase();
  const couponRepository = new CouponRepositoryDatabase();
  checkout = new Checkout(productRepository, couponRepository);
  orderRepository = new OrderRepositoryDatabase();
  getOrder = new GetOrder(orderRepository);
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
    coupon: "VALE20_2"
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
    coupon: "VALE20_2"
  }

  expect(() => checkout.execute(order)).rejects.toThrow(new Error('Invalid cpf'));
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
    coupon: "VALE20_2"
  }

  expect(() => checkout.execute(order)).rejects.toThrow(new Error('Invalid cpf'));
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
    coupon: "VALE20"
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
    coupon: "VALE0"
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
    coupon: "VALE20"
  }

  expect(() => checkout.execute(order)).rejects.toThrow(new Error('Invalid quantity!'));
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
    coupon: "VALE20"
  }

  expect(() => checkout.execute(order)).rejects.toThrow(new Error('Duplicated item!'));
})

test("Should not create order items that have negative measures", async function () {
  const uuid = crypto.randomUUID();
  const order = {
    id: uuid,
    cpf: "11144477735",
    items: [
      { "idProduct": 4, "quantity": 2 },
    ],
    coupon: "VALE20_2"
  }

  expect(() => checkout.execute(order)).rejects.toThrow(new Error('Invalid measures!'));
})

test("Should not create order items that have negative weight", async function () {
  const uuid = crypto.randomUUID();
  const order = {
    id: uuid,
    cpf: "11144477735",
    items: [
      { "idProduct": 4, "quantity": 2 },
    ],
    coupon: "VALE20_2"
  }

  expect(() => checkout.execute(order)).rejects.toThrow(new Error('Invalid measures!'));
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
    coupon: "VALE20_2"
  }

  const response = await checkout.execute(order);
  expect(response.getItems().length).toBe(3);
  expect(response.getTotal()).toBe(28000);
  expect(response.getTotalFare()).toBe(440)
})

test('Should create and persist an order', async function () {
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
  }

  await checkout.execute(order);
  const response = await getOrder.execute(uuid);
  expect(response.getItems().length).toBe(3);
  expect(response.getTotal()).toBe(35000);
  expect(response.getTotalFare()).toBe(440)
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
  }

  await checkout.execute(order2);
  const order2_ = await getOrder.execute(order_id2);
  expect(order2_.getItems().length).toBe(3);
  expect(order2_.getTotal()).toBe(35000);
  expect(order2_.getTotalFare()).toBe(440)
  expect(order2_.getCode()).toBe("202300000002")
})