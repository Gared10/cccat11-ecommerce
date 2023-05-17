import pgp from "pg-promise";
import CouponRepository from "./CouponRespository";

export default class CouponRepositoryDatabase implements CouponRepository {
  async get(coupon: string) {
    const connection = pgp()("postgres://postgres:postgres123@localhost:5432/app")
    const [couponData] = await connection.query('select percentage, expiration_date from ecommerce.coupon where code = $1', [coupon]);
    await connection.$pool.end();
    return couponData;
  }
}