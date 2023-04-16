import OrderItem from "./OrderItem"

export default class Order {
  private cpf: string
  private items: OrderItem[] | undefined

  constructor(cpf: string, items?: OrderItem[]){
    this.items = items
    this.cpf = cpf
  }

  addOrderItem(description: string, quantity: number, price: number){
    const product = new OrderItem(description, quantity, price);
    return this.items ? this.items.push(product) : this.items = [product];
  }

  getItems(): OrderItem[]{
    return this.items ? this.items : [];
  }

  getTotal(){
    let totalAmount: number = 0
    this.items?.map((item: OrderItem) => {
      totalAmount += item.getItemTotal();
    })
    return totalAmount;
  }

  getCpf(){
    return this.cpf
  }

  isValidCpf(): boolean{
    let digit: number = 0;
    let firstVerifierSum: number = 0;
    let secondVerifierSum: number = 0;
    let firstVerifierDigit: string = '';
    let secondVerifierDigit: string = '';
    let mod: number = 0;
    let validateCPF: string = '';
    
    if (this.cpf.length < 11) return false;
    for(digit; digit<this.cpf.length; digit++){
      firstVerifierSum += (Number(this.cpf[digit])*(11-(digit+1)))
      if(digit+1 === 9){
        mod = firstVerifierSum % 11
        firstVerifierDigit = mod >= 2 ? String(11-mod) : '0'
        mod = 0
      }
      secondVerifierSum += (digit !== 10 ? Number(this.cpf[digit]) : Number(firstVerifierDigit) * (11-(digit)) )
      if(digit+1 === 10){
        mod = secondVerifierSum % 11
        secondVerifierDigit = mod >= 2 ? String(11-mod) : '0'
        mod = 0
      }
    }
    validateCPF = this.cpf.substring(0,9) + firstVerifierDigit + secondVerifierDigit
    return validateCPF === this.cpf ? true : false
  }


}