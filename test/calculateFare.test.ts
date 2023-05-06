import { calculateFare } from "../src/calculateFare"

test('Should calculate products fare', function () {
  const product = {
    price: 5000,
    height: 10,
    width: 30,
    product_length: 100,
    weight: 3
  }
  const fare: number = calculateFare(product.height, product.width, product.product_length, product.weight)

  expect(fare).toBe(30);
})

test('Should calculate minimal fare price', function () {
  const product = {
    price: 1000,
    height: 10,
    width: 15,
    product_length: 20,
    weight: 1
  }
  const fare: number = calculateFare(product.height, product.width, product.product_length, product.weight)

  expect(fare).toBe(10);
})

test('Should calculate minimal fare price', function () {
  const product = {
    price: 1000,
    height: -10,
    width: 15,
    product_length: 20,
    weight: 1
  }
  const fare: number = calculateFare(product.height, product.width, product.product_length, product.weight)

  expect(fare).toBe(10);
})