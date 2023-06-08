import express, { Request, Response } from "express";
import Checkout from "./Checkout";
import ListOrders from "./ListOrders";
import DatabaseRepositoryFactory from "./DatabaseRepositoryFactory";

const app = express()

app.use(express.json())

app.post("/checkout", async function (request: Request, response: Response) {
  const repositoryFactory = new DatabaseRepositoryFactory();
  const checkout = new Checkout(repositoryFactory);
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
  const repositoryFactory = new DatabaseRepositoryFactory();
  const listOrders = new ListOrders(repositoryFactory);
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

