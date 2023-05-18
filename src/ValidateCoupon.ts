import CouponRepositoryDatabase from "./CouponRepositoryDatabase"

export default class ValidateCoupon {
  constructor(readonly couponRepository = new CouponRepositoryDatabase) {

  }

  async execute(code: string): Promise<Output> {
    const output = {
      isValid: false
    }
    const couponData = await this.couponRepository.get(code);
    const nowDate = new Date();
    output.isValid = couponData && couponData.expiration_date.getTime() > nowDate.getTime()

    return output
  }
}

type Output = {
  isValid: boolean
}