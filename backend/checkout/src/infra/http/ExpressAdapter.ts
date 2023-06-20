import express, { Request, Response } from 'express';
import HttpServer from "./HttpServer";

export default class ExpressAdapter implements HttpServer {
  app: any;

  constructor() {
    this.app = express();
    this.app.use(express.json())
  }

  on(method: string, url: string, callback: Function): void {
    this.app[method](url, async function (request: Request, response: Response) {
      try {
        const output = await callback(request.body, request.params);
        response.json(output);
      } catch (error: any) {
        response.status(422).json({
          message: error.message
        });
      }
    })
  }
  listen(port: number, message: string): void {
    this.app.listen(port, () => {
      console.log(message);
    });
  }

}