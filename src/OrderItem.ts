export default class OrderItem {
  
  private description: string;
  private quantity: number;
  private price: number;

  constructor(description: string, quantity: number, price: number){
    this.description = description;
    this.price = price;
    this.quantity = quantity;
  }

  getItemTotal(){
    return this.quantity * this.price;
  }

}