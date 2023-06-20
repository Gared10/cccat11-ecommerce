export default class Coupon {
  constructor(readonly code: string, readonly percentage: number, readonly expiration_date: Date) {
    this.code = code ?? '';
    this.percentage = percentage ?? 0;
    this.expiration_date = expiration_date ?? new Date().setDate(new Date().getDate() - 1);
  }

  isValid(nowDate: Date) {
    return this.expiration_date.getTime() > nowDate.getTime();
  }

  calculateDiscount(total: number) {
    return total * (this.percentage / 100);
  }
}