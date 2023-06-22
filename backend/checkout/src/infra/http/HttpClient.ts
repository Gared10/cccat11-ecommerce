export default interface HttpClient {
  get(url: string, data?: any): Promise<any>;
  post(url: string, data: any): Promise<any>;
}