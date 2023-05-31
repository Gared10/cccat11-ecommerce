import CouponRepositoryDatabase from "./CouponRepositoryDatabase"

export default class ValidateCoupon {
  constructor(readonly couponRepository = new CouponRepositoryDatabase) {

  }

  async execute(code: string): Promise<Output> {
    const output = {
      isValid: false
    }
    const coupon = await this.couponRepository.get(code);
    const nowDate = new Date();
    output.isValid = coupon && coupon.isValid(nowDate);
    return output
  }
}

type Output = {
  isValid: boolean
}