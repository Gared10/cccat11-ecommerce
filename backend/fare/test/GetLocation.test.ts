import GetLocation from "../src/application/usecase/GetLocation"
import DatabaseConnection from "../src/infra/database/DatabaseConnection";
import PgPromiseAdapter from "../src/infra/database/PgPromiseAdapter";
import DatabaseRepositoryFactory from "../src/infra/factory/DatabaseRepositoryFactory"

test("Should get a location", async () => {
  const cep = "88015600";
  const connection: DatabaseConnection = new PgPromiseAdapter();
  await connection.connect();
  const repositoryFactory = new DatabaseRepositoryFactory(connection);
  const getLocation = new GetLocation(repositoryFactory);
  const output = await getLocation.execute({ cep: cep });
  expect(output.CEP).toBe("88015600")
  expect(output.latitude).toBe(-27.5906685)
  expect(output.longitude).toBe(-48.5605664)
})