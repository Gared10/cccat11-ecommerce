import DatabaseRepositoryFactory from "./DatabaseRepositoryFactory";
import PgPromiseAdapter from "./PgPromiseAdapter";
import ExpressAdapter from "./ExpressAdapter";
import HttpController from "./HttpController";
import HttpUseCaseFactory from "./HttpUseCaseFactory";

const port = 3000;
const connection = new PgPromiseAdapter()
connection.connect();
const repositoryFactory = new DatabaseRepositoryFactory(connection);
const useCaseFactory = new HttpUseCaseFactory(repositoryFactory);
const httpServer = new ExpressAdapter();
new HttpController(httpServer, useCaseFactory);

httpServer.listen(port, `Server running on port ${port}!`);

