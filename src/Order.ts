import OrderItem from "./OrderItem"

export default class Order {

  private items: OrderItem[] | undefined

  constructor(items?: OrderItem[]){
    this.items = items
  }

  addOrderItem(description: string, quantity: number, price: number){
    const product = new OrderItem(description, quantity, price);
    return this.items ? this.items.push(product) : this.items = [product];
  }

  getItems(){
    return this.items;
  }

  getTotal(){
    let totalAmount: number = 0

    this.items?.map((item: OrderItem) => {
      totalAmount += item.getItemTotal();
    })
    
    return totalAmount;
  }


}