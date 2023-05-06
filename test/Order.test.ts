import axios from "axios";

test('Should create an order with 3 items and calculate total amount', async function () {
  const order = {
    cpf: "11144477735",
    items: [
      { "idProduct": 1, "quantity": 2 },
      { "idProduct": 2, "quantity": 5 },
      { "idProduct": 3, "quantity": 1 }
    ],
  }

  const data = await axios.post("http://localhost:3000/order", order)

  expect(data.data.items).toBe(3);
  expect(data.data.total).toBe(35000);
  expect(data.data.message).toBe('');
})

test('Should create an order with 3 items, associate discount coupon and calculate total amount(with discount over total amount)', async function () {
  const order = {
    cpf: "11144477735",
    items: [
      { "idProduct": 1, "quantity": 2 },
      { "idProduct": 2, "quantity": 5 },
      { "idProduct": 3, "quantity": 1 }
    ],
    coupon: "VALE20_2"
  }

  const data = await axios.post("http://localhost:3000/order", order)

  expect(data.data.items).toBe(3);
  expect(data.data.total).toBe(28000);
  expect(data.data.message).toBe('');
})

test('Should alert that the cpf is invalid and not create any order', async function () {
  const order = {
    cpf: "12345678910",
    items: [
      { "idProduct": 1, "quantity": 2 },
      { "idProduct": 2, "quantity": 5 },
      { "idProduct": 3, "quantity": 1 }
    ],
    coupon: "VALE20_2"
  }

  const data = await axios.post("http://localhost:3000/order", order)

  expect(data.data.items).toBe(0);
  expect(data.data.total).toBe(0);
  expect(data.data.message).toBe('Invalid cpf');
})

test('Should alert that the cpf is invalid and not create any order because cpf field is not filled in request data', async function () {
  const order = {
    items: [
      { "idProduct": 1, "quantity": 2 },
      { "idProduct": 2, "quantity": 5 },
      { "idProduct": 3, "quantity": 1 }
    ],
    coupon: "VALE20_2"
  }

  const data = await axios.post("http://localhost:3000/order", order)

  expect(data.data.items).toBe(0);
  expect(data.data.total).toBe(0);
  expect(data.data.message).toBe('Invalid cpf');
})

test("Should not apply expired discount coupon", async function () {
  const order = {
    cpf: "11144477735",
    items: [
      { "idProduct": 1, "quantity": 2 },
      { "idProduct": 2, "quantity": 5 },
      { "idProduct": 3, "quantity": 1 }
    ],
    coupon: "VALE20"
  }

  const data = await axios.post("http://localhost:3000/order", order)

  expect(data.data.items).toBe(3);
  expect(data.data.total).toBe(35000);
  expect(data.data.message).toBe('Expired coupon! Order total amount without discount!')
})

test("Should not apply expired discount coupon", async function () {
  const order = {
    cpf: "11144477735",
    items: [
      { "idProduct": 1, "quantity": 2 },
      { "idProduct": 2, "quantity": -5 },
      { "idProduct": 3, "quantity": 1 }
    ],
    coupon: "VALE20"
  }

  const data = await axios.post("http://localhost:3000/order", order)

  expect(data.data.items).toBe(0);
  expect(data.data.total).toBe(0);
  expect(data.data.message).toBe('Order has item with negative quantity!')
})