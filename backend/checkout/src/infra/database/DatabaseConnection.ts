export default interface DatabaseConnection {
  query(statement: string, params?: any): Promise<any>;
  connect(): Promise<void>;
  close(): Promise<any>;
}