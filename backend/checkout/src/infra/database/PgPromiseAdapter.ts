import DatabaseConnection from "./DatabaseConnection";
import pgp from 'pg-promise';

export default class PgPromiseAdapter implements DatabaseConnection {
  connection: any;

  async query(statement: string, params: any): Promise<any> {
    return this.connection.query(statement, params);
  }

  async connect(): Promise<void> {
    this.connection = pgp()("postgres://postgres:postgres123@localhost:5432/app");
  }

  async close(): Promise<any> {
    await this.connection.$pool.end();
  }

}