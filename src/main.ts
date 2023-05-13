import express, { Request, Response } from "express";
import OrderItem from "./OrderItem";
import Order from "./Order";
import { validate } from "./validateCPF";
import pgp from "pg-promise";

const app = express()

app.use(express.json())

app.post("/order", async function (request: Request, response: Response) {
  const connection = pgp()("postgres://postgres:postgres123@localhost:5432/app")
  try {
    const result = {
      total: 0,
      items: 0,
      fare: 0,
      message: ''
    }
    let items: OrderItem[]
    let order: Order

    if (!validate(request.body.cpf)) return response.json({ message: 'Invalid cpf', total: result.total, items: result.items });

    if (request.body.items) {
      order = new Order(request.body.cpf)
      for (const item of request.body.items) {
        if (item.quantity <= 0) throw new Error("Invalid quantity!");
        const [productData] = await connection.query("select description, price, width, height, weight, product_length from ecommerce.product where id_product = $1", [item.idProduct]);
        if (order.getItems().find(element => element.getIdProduct() === item.idProduct)) throw new Error("Order with duplicated items!");
        if (productData.height <= 0 || productData.width <= 0 || productData.product_length <= 0 || productData.weight <= 0) throw new Error("Order has items with negative measures!");
        order.addOrderItem(productData.description, item.quantity, productData.price, item.idProduct, productData.height, productData.weight, productData.width, productData.product_length);
      }
      result.total = order.getTotal();
      result.items = order.getItems().length;
      result.fare = order.getTotalFare();
      if (request.body.coupon && result.items > 0) {
        const [couponData] = await connection.query('select percentage, expiration_date from ecommerce.coupon where code = $1', [request.body.coupon]);
        const nowDate: Date = new Date();
        if (couponData && couponData.expiration_date.getTime() > nowDate.getTime()) {
          result.total -= order.getTotal() * (parseFloat(couponData.percentage) / 100);
        }
      }
    }

    return response.json(result);
  } catch (error: any) {
    response.status(422).json({
      message: error.message
    })
  } finally {
    await connection.$pool.end();
  }
})


app.listen(3000, () => {
  console.log('Server running on port 3000!')
})

