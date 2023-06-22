import CouponRepository from "../../application/repository/CouponRespository";
import Coupon from "../../domain/entity/Coupon";
import DatabaseConnection from "../database/DatabaseConnection";

export default class CouponRepositoryDatabase implements CouponRepository {

  constructor(readonly connection: DatabaseConnection) {
  }

  async get(code: string) {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const [couponData] = await this.connection.query('select code, percentage, expiration_date from ecommerce.coupon where code = $1', [code]);
    const coupon = couponData ? new Coupon(couponData.code, parseFloat(couponData.percentage), couponData.expiration_date) : new Coupon('', 0, yesterday);
    return coupon;
  }
}