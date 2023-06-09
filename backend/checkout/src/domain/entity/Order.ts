import Coupon from "./Coupon";
import OrderItem from "./OrderItem"
import Product from "./Product"

export default class Order {
  private cpf: string;
  private id: string;
  private code: string;
  private items: OrderItem[];
  coupon?: Coupon;
  private total: number;
  private totalFare: number;

  constructor(cpf: string, id: string, readonly fromCEP: string, readonly toCEP: string, code?: string, sequence?: number, items?: OrderItem[], readonly date: Date = new Date()) {
    if (!id) throw new Error("Order's id is mandatory")
    this.items = items ?? [];
    this.cpf = cpf;
    this.id = id;
    this.code = code ?? this.generateCode(sequence ?? 1);
    this.total = 0;
    this.totalFare = 0;
  }

  addOrderItem(quantity: number, product: Product) {
    if (this.items.find(item => item.getIdProduct() === product.idProduct)) throw new Error("Duplicated item!");
    this.items.push(new OrderItem(quantity, product));
    this.total = this.getTotal();
  }

  addCoupon(coupon: Coupon) {
    if (coupon.isValid(this.date)) this.coupon = coupon;
    this.total = this.getTotal();
  }

  getItems(): OrderItem[] {
    return this.items;
  }

  getTotal(): number {
    let total: number = 0
    this.items.map((item: OrderItem) => {
      total += item.getItemTotal();
    })
    if (this.coupon) total -= this.coupon.calculateDiscount(total);
    return total;
  }

  getTotalFare(): number {
    return this.totalFare;
  }

  getCpf(): string {
    return this.cpf
  }

  getId() {
    return this.id;
  }

  setItems(items: OrderItem[]): void {
    this.items = items;
  }

  setTotalFare(fare: number): void {
    this.totalFare = fare;
  }

  getFromCEP(): string {
    return this.fromCEP;
  }

  getToCEP(): string {
    return this.toCEP;
  }

  generateCode(sequence: number) {
    const today = new Date();
    const code = `${today.getFullYear()}${new String(sequence).padStart(8, "0")}`
    return code;
  }

  getCode() {
    return this.code;
  }
}