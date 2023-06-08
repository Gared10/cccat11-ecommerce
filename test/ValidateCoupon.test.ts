import CouponRepositoryDatabase from "../src/CouponRepositoryDatabase"
import DatabaseRepositoryFactory from "../src/DatabaseRepositoryFactory"
import ValidateCoupon from "../src/ValidateCoupon"

test('Should validate whether a coupon is valid or not', async function () {
  const input = "VALE20"
  const repositoryFactory = new DatabaseRepositoryFactory()
  const validateCoupon = new ValidateCoupon(repositoryFactory)
  const output = await validateCoupon.execute(input);

  expect(output.isValid).toBe(false)
})