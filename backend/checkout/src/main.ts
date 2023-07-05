import DatabaseRepositoryFactory from "./infra/factory/DatabaseRepositoryFactory";
import PgPromiseAdapter from "./infra/database/PgPromiseAdapter";
import ExpressAdapter from "./infra/http/ExpressAdapter";
import HttpController from "./infra/http/HttpController";
import HttpUseCaseFactory from "./infra/factory/HttpUseCaseFactory";
import AxiosHttpClient from "./infra/http/AxiosHttpClient";
import GatewayHttpFactory from "./infra/factory/GatewayHttpFactory";

const port = 3000;
const connection = new PgPromiseAdapter()
connection.connect();
const repositoryFactory = new DatabaseRepositoryFactory(connection);
const httpClient = new AxiosHttpClient()
const gatewayHttpFactory = new GatewayHttpFactory(httpClient)
const useCaseFactory = new HttpUseCaseFactory(repositoryFactory, gatewayHttpFactory);
const httpServer = new ExpressAdapter();
new HttpController(httpServer, useCaseFactory);

httpServer.listen(port, `Server running on port ${port}!`);

