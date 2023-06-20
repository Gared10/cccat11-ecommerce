import DatabaseConnection from "../src/infra/database/DatabaseConnection";
import DatabaseRepositoryFactory from "../src/infra/factory/DatabaseRepositoryFactory";
import PgPromiseAdapter from "../src/infra/database/PgPromiseAdapter";
import SimulateFare from "../src/application/usecase/SimulateFare";

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
  const connection: DatabaseConnection = new PgPromiseAdapter();
  await connection.connect();
  const repositoryFactory = new DatabaseRepositoryFactory(connection);
  const simulateFare = new SimulateFare(repositoryFactory);
  const output = await simulateFare.execute(input);
  expect(output.fare).toBe(1060);
  await connection.close();
})