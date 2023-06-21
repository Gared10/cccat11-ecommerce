import GetProduct from "../src/application/usecase/GetProduct"
import DatabaseConnection from "../src/infra/database/DatabaseConnection";
import PgPromiseAdapter from "../src/infra/database/PgPromiseAdapter";
import DatabaseRepositoryFactory from "../src/infra/factory/DatabaseRepositoryFactory";

test("Should list one product", async () => {

  let connection: DatabaseConnection;
  connection = new PgPromiseAdapter();
  await connection.connect();
  const repositoryFactory = new DatabaseRepositoryFactory(connection);
  const getProduct = new GetProduct(repositoryFactory);
  const product = await getProduct.execute({ id: 1 });
  expect(product.idProduct).toBe(1);
  expect(product.description).toBe("Camera");
  expect(product.width).toBe(15);
  expect(product.weight).toBe(1);
  expect(product.height).toBe(10);
  expect(product.product_length).toBe(20);
  expect(product.volume).toBe(3000);
  expect(product.density).toBe(0.0003333333333333333);
})