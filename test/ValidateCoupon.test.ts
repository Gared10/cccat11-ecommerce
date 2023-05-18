import CouponRepositoryDatabase from "../src/CouponRepositoryDatabase"
import ValidateCoupon from "../src/ValidateCoupon"

test('Should validate whether a coupon is valid or not', async function () {
  const input = "VALE20"
  const couponRepository = new CouponRepositoryDatabase()
  const validateCoupon = new ValidateCoupon(couponRepository)
  const output = await validateCoupon.execute(input);

  expect(output.isValid).toBe(false)
})