import ProductRepositoryDatabase from "../src/ProductRepositoryDatabase";
import SimulateFare from "../src/SimulateFare";

test('Should simulate fare', async function () {
  const input = {
    items: [
      { "idProduct": 1, "quantity": 2 },
      { "idProduct": 2, "quantity": 5 },
      { "idProduct": 3, "quantity": 1 }
    ],
    from: { CEP: "88015600", latitude: -27.5906685, longitude: -48.5605664 },
    to: { CEP: "22030060", latitude: -9.610394, longitude: -35.725652 }
  }
  const productRepository = new ProductRepositoryDatabase()
  const simulateFare = new SimulateFare(productRepository);
  const output = await simulateFare.execute(input);
  expect(output.fare).toBe(440);
})