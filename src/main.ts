import express, { Request, Response } from "express";
import Checkout from "./Checkout";
import ListOrders from "./ListOrders";
import DatabaseRepositoryFactory from "./DatabaseRepositoryFactory";
import PgPromiseAdapter from "./PgPromiseAdapter";

const app = express()

app.use(express.json())
const connection = new PgPromiseAdapter()
connection.connect();
const repositoryFactory = new DatabaseRepositoryFactory(connection);
const checkout = new Checkout(repositoryFactory);
const listOrders = new ListOrders(repositoryFactory);

app.post("/checkout", async function (request: Request, response: Response) {
  try {
    const output = await checkout.execute(request.body);
    response.json(output);
  } catch (error: any) {
    response.status(422).json({
      message: error.message
    });
  }

})

app.get("/orders", async function (request: Request, response: Response) {
  try {
    const output = await listOrders.execute();
    response.json(output);
  } catch (error: any) {
    response.status(422).json({
      message: error.message
    });
  }

})


app.listen(3000, () => {
  console.log('Server running on port 3000!')
})

