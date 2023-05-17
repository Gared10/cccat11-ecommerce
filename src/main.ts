import express, { Request, Response } from "express";
import Checkout from "./Checkout";

const app = express()

app.use(express.json())

app.post("/checkout", async function (request: Request, response: Response) {

  const checkout = new Checkout();
  try {
    const output = await checkout.execute(request.body);
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

