import CouponRepositoryDatabase from "../src/CouponRepositoryDatabase"
import DatabaseConnection from "../src/DatabaseConnection"
import DatabaseRepositoryFactory from "../src/DatabaseRepositoryFactory"
import PgPromiseAdapter from "../src/PgPromiseAdapter"
import ValidateCoupon from "../src/ValidateCoupon"

test('Should validate whether a coupon is valid or not', async function () {
  const input = "VALE20"
  const connection: DatabaseConnection = new PgPromiseAdapter();
  await connection.connect();
  const repositoryFactory = new DatabaseRepositoryFactory(connection);
  const validateCoupon = new ValidateCoupon(repositoryFactory)
  const output = await validateCoupon.execute(input);
  expect(output.isValid).toBe(false)
  await connection.close();
})