import Order from "../src/Order"

test('Should create an order with 3 items and calculate total amount', () => {
  let order: Order = new Order();
  order.addOrderItem('Gillette', 2, 10);
  order.addOrderItem('Always', 5, 15);
  order.addOrderItem('Queijo', 1, 25);
  expect(order.getItems()?.length).toBe(3);
  expect(order.getTotal()).toBe(120);
})