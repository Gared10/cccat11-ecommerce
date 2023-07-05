import DatabaseRepositoryFactory from "./infra/factory/DatabaseRepositoryFactory";
import PgPromiseAdapter from "./infra/database/PgPromiseAdapter";
import ExpressAdapter from "./infra/http/ExpressAdapter";
import HttpController from "./infra/http/HttpController";
import HttpUseCaseFactory from "./infra/factory/HttpUseCaseFactory";

const port = 3004;
const connection = new PgPromiseAdapter()
connection.connect();
const repositoryFactory = new DatabaseRepositoryFactory(connection);
const useCaseFactory = new HttpUseCaseFactory(repositoryFactory);
const httpServer = new ExpressAdapter();
new HttpController(httpServer, useCaseFactory);

httpServer.listen(port, `Server running on port ${port}!`);

