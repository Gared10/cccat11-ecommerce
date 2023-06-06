import axios from "axios";
import crypto from 'crypto';

axios.defaults.validateStatus = function () {
  return true;
}

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

  const response = await axios.post("http://localhost:3000/checkout", order)

  expect(response.data.items.length).toBe(3);
  expect(response.data.total).toBe(35000);
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

  const response = await axios.post("http://localhost:3000/checkout", order)

  expect(response.data.items.length).toBe(3);
  expect(response.data.total).toBe(28000);
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

  const response = await axios.post("http://localhost:3000/checkout", order)

  expect(response.status).toBe(422)
  expect(response.data.message).toBe('Invalid cpf');
})

test('Should alert that the cpf is invalid and not create any order because cpf field is not filled in request data', async function () {
  const uuid = crypto.randomUUID();
  const order = {
    id: uuid,
    items: [
      { "idProduct": 1, "quantity": 2 },
      { "idProduct": 2, "quantity": 5 },
      { "idProduct": 3, "quantity": 1 }
    ],
    coupon: "VALE20_2"
  }

  const response = await axios.post("http://localhost:3000/checkout", order)

  expect(response.status).toBe(422)
  expect(response.data.message).toBe('Invalid cpf');
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

  const response = await axios.post("http://localhost:3000/checkout", order)

  expect(response.data.items.length).toBe(3);
  expect(response.data.total).toBe(35000);
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

  const response = await axios.post("http://localhost:3000/checkout", order)

  expect(response.data.items.length).toBe(3);
  expect(response.data.total).toBe(35000);
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

  const response = await axios.post("http://localhost:3000/checkout", order)

  expect(response.status).toBe(422)
  expect(response.data.message).toBe('Invalid quantity!')
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

  const response = await axios.post("http://localhost:3000/checkout", order)

  expect(response.status).toBe(422)
  expect(response.data.message).toBe('Duplicated item!')
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

  const response = await axios.post("http://localhost:3000/checkout", order)

  expect(response.status).toBe(422)
  expect(response.data.message).toBe('Invalid measures!')
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

  const response = await axios.post("http://localhost:3000/checkout", order)

  expect(response.status).toBe(422)
  expect(response.data.message).toBe('Invalid measures!')
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

  const response = await axios.post("http://localhost:3000/checkout", order)

  expect(response.data.items.length).toBe(3);
  expect(response.data.total).toBe(28000);
  expect(response.data.totalFare).toBe(440)
})

test("Should not create any order and alert that id is mandatory", async function () {
  const order = {
    cpf: "11144477735",
    items: [
      { "idProduct": 1, "quantity": 2 },
      { "idProduct": 2, "quantity": 5 },
      { "idProduct": 3, "quantity": 1 }
    ],
    coupon: "VALE20_2"
  };

  const response = await axios.post("http://localhost:3000/checkout", order);
  expect(response.data.message).toBe("Order's id is mandatory");
})