import CouponRepository from "./CouponRespository";
import RepositoryFactory from "./RepositoryFactory";

export default class ValidateCoupon {
  couponRepository: CouponRepository;

  constructor(repositoryFactory: RepositoryFactory) {
    this.couponRepository = repositoryFactory.createCouponRepository();
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