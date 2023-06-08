import Product from "../src/Product"

test('Should create a product', function () {
  const product = new Product('Carteira', 25, 5, 2, 100, 5, 10)

  expect(product.getIdProduct()).toBeGreaterThan(0);
})

test('Should not create a product and alert that there is a(some) invalid measure(s)', function () {
  expect(() => new Product('Carteira', 25, 5, 2, -100, 5, 10)).toThrow(new Error('Invalid measures!'));
})

test('Should calculate volume', function () {
  const product = new Product('Carteira', 25, 5, 2, 100, 5, 10)
  expect(product.getVolume()).toBe(100)
})

