import DatabaseConnection from "../src/infra/database/DatabaseConnection";
import DatabaseRepositoryFactory from "../src/infra/factory/DatabaseRepositoryFactory";
import PgPromiseAdapter from "../src/infra/database/PgPromiseAdapter";
import SimulateFare from "../src/application/usecase/SimulateFare";
import GatewayHttpFactory from "../src/infra/factory/GatewayHttpGateway";
import AxiosHttpClient from "../src/infra/http/AxiosHttpClient";

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
  const connection: DatabaseConnection = new PgPromiseAdapter();
  await connection.connect();
  const repositoryFactory = new DatabaseRepositoryFactory(connection);
  const httpClient = new AxiosHttpClient();
  const gatewayFactory = new GatewayHttpFactory(httpClient);
  const simulateFare = new SimulateFare(repositoryFactory, gatewayFactory);
  const output = await simulateFare.execute(input);
  expect(output.fare).toBe(1060);
  await connection.close();
})