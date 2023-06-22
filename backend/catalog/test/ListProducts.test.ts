import ListProducts from "../src/application/usecase/ListProducts";
import DatabaseConnection from "../src/infra/database/DatabaseConnection";
import PgPromiseAdapter from "../src/infra/database/PgPromiseAdapter";
import DatabaseRepositoryFactory from "../src/infra/factory/DatabaseRepositoryFactory";

test("Should list one product", async () => {
  let connection: DatabaseConnection;
  connection = new PgPromiseAdapter();
  await connection.connect();
  const repositoryFactory = new DatabaseRepositoryFactory(connection);
  const listProduct = new ListProducts(repositoryFactory);
  const products = await listProduct.execute();
  expect(products.length).toBe(4);
})