import express, { Request, Response } from "express";
import OrderItem from "./OrderItem";
import Order from "./Order";
import { validate } from "./validateCPF";
import config from "./config";
import pgp from "pg-promise";

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

  if (!validate(request.body.cpf)) return response.json({ message: 'Invalid cpf', total: result.total, items: result.items });

  const connection = pgp()("postgres://postgres:postgres123@localhost:5432/app")
  if (request.body.items) {
    order = new Order(request.body.cpf)
    for (const item of request.body.items) {
      const [productData] = await connection.query("select description, price from ecommerce.product where id_product = $1", [item.idProduct]);
      order.addOrderItem(productData.description, item.quantity, productData.price);
    }
    result.total = order.getTotal();
    result.items = order.getItems().length;
    if (request.body.coupon) {
      const [couponData] = await connection.query('select percentage from ecommerce.coupon where code = $1', [request.body.coupon]);
      const percentage: number = parseFloat(couponData.percentage);
      result.total -= order.getTotal() * (percentage / 100);
    }
  }

  return response.json(result);
})


app.listen(3000, () => {
  console.log('Server running on port 3000!')
})

