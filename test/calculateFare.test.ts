import Product from "../src/Product"
import { calculateFare } from "../src/calculateFare"

test('Should calculate products fare', function () {
  const product = new Product('Geladeira', 5000, 6, 10, 3, 30, 100)
  const fare: number = calculateFare(product)

  expect(fare).toBe(30);
})

test('Should calculate minimal fare price', function () {
  const product = new Product('Geladeira', 1000, 6, 10, 1, 10, 20)
  const fare: number = calculateFare(product)

  expect(fare).toBe(10);
})

test('Should calculate minimal fare price', function () {
  const product = new Product('Geladeira', 1000, 6, 1, 1, 10, 20)
  const fare: number = calculateFare(product)

  expect(fare).toBe(10);
})