import axios from "axios";

test('Should create an order with 3 items and calculate total amount', async function () {
  const order = {
    items: [
      {"description": 'Gillette', "quantity": 2, "price": 10},
      {"description": 'Always', "quantity": 5, "price": 15},
      {"description": 'Queijo', "quantity": 1, "price": 25}
    ]
  }

  const data = await axios.post("http://localhost:3000/order", order)

  expect(data.data.items).toBe(3);
  expect(data.data.total).toBe(120);
})

test('Should create an order with 3 items, associate discount coupon and calculate total amount(with discount over total amount)', async function () {
  const order = {
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
})