import express, { Request, Response } from "express";
import OrderItem from "./OrderItem";
import Order from "./Order";

const app = express()

app.use(express.json())

app.post("/order", async function (request: Request, response: Response) {
  const result = {
    total: 0,
    items: 0,
    message: ''
  }

  let items: OrderItem[]
  let order: Order

  if(request.body.items){
    order = new Order()
    request.body.items.map((item: any) => {
      order.addOrderItem(item.description, item.quantity, item.price)
    })
    result.total = order.getTotal()
    result.items = order.getItems().length
  }

  return response.json(result);
})

app.listen(3000, () => {
  console.log('Server running on port 3000!')
})