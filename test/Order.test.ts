import axios from "axios";

test('Should create an order with 3 items and calculate total amount', async function () {
  const order = {
    cpf: "11144477735",
    items: [
      {"description": 'Gillette', "quantity": 2, "price": 10},
      {"description": 'Always', "quantity": 5, "price": 15},
      {"description": 'Queijo', "quantity": 1, "price": 25}
    ]
  }

  const data = await axios.post("http://localhost:3000/order", order)

  expect(data.data.items).toBe(3);
  expect(data.data.total).toBe(120);
  expect(data.data.message).toBe('');
})

test('Should create an order with 3 items, associate discount coupon and calculate total amount(with discount over total amount)', async function () {
  const order = {
    cpf: "11144477735",
    items: [
      {"description": 'Gillette', "quantity": 2, "price": 10},
      {"description": 'Always', "quantity": 5, "price": 15},
      {"description": 'Queijo', "quantity": 1, "price": 25}
    ],
    coupon: 5
  }

  const data = await axios.post("http://localhost:3000/order", order)

  expect(data.data.items).toBe(3);
  expect(data.data.total).toBe(114);
  expect(data.data.message).toBe('');
})

test('Should alert that the cpf is invalid and not create any order', async function () {
  const order = {
    cpf: '12345678910',
    items: [
      {"description": 'Gillette', "quantity": 2, "price": 10},
      {"description": 'Always', "quantity": 5, "price": 15},
      {"description": 'Queijo', "quantity": 1, "price": 25}
    ],
    coupon: 5
  }

  const data = await axios.post("http://localhost:3000/order", order)

  expect(data.data.items).toBe(0);
  expect(data.data.total).toBe(0);
  expect(data.data.message).toBe('Invalid cpf');
})

test('Should alert that the cpf is invalid and not create any order because cpf field is not filled in request data', async function () {
  const order = {
    items: [
      {"description": 'Gillette', "quantity": 2, "price": 10},
      {"description": 'Always', "quantity": 5, "price": 15},
      {"description": 'Queijo', "quantity": 1, "price": 25}
    ],
    coupon: 5
  }

  const data = await axios.post("http://localhost:3000/order", order)

  expect(data.data.items).toBe(0);
  expect(data.data.total).toBe(0);
  expect(data.data.message).toBe('Invalid cpf');
})