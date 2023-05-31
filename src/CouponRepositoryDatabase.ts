import pgp from "pg-promise";
import CouponRepository from "./CouponRespository";
import Coupon from "./Coupon";

export default class CouponRepositoryDatabase implements CouponRepository {
  async get(code: string) {
    const connection = pgp()("postgres://postgres:postgres123@localhost:5432/app")
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const [couponData] = await connection.query('select code, percentage, expiration_date from ecommerce.coupon where code = $1', [code]);
    const coupon = couponData ? new Coupon(couponData.code, parseFloat(couponData.percentage), couponData.expiration_date) : new Coupon('', 0, yesterday);
    await connection.$pool.end();
    return coupon;
  }
}