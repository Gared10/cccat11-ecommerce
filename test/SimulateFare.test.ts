import ProductRepositoryDatabase from "../src/ProductRepositoryDatabase";
import SimulateFare from "../src/SimulateFare";

test('Should simulate fare', async function () {
  const input = {
    items: [
      { "idProduct": 1, "quantity": 2 },
      { "idProduct": 2, "quantity": 5 },
      { "idProduct": 3, "quantity": 1 }
    ],
    from: "88015600",
    to: "22030060"
  }
  const productRepository = new ProductRepositoryDatabase()
  const simulateFare = new SimulateFare(productRepository);
  const output = await simulateFare.execute(input);
  expect(output.fare).toBe(440);
})