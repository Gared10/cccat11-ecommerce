import CouponRepositoryDatabase from "../src/infra/repository/CouponRepositoryDatabase"
import DatabaseConnection from "../src/infra/database/DatabaseConnection"
import DatabaseRepositoryFactory from "../src/infra/factory/DatabaseRepositoryFactory"
import PgPromiseAdapter from "../src/infra/database/PgPromiseAdapter"
import ValidateCoupon from "../src/application/usecase/ValidateCoupon"

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