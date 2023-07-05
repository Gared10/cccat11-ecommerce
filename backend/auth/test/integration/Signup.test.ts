import Login from "../../src/application/usecase/Login";
import SignUp from "../../src/application/usecase/SignUp";
import PgPromiseAdapter from "../../src/infra/database/PgPromiseAdapter";
import DatabaseRepositoryFactory from "../../src/infra/factory/DatabaseRepositoryFactory";
import UserRepositoryDatabase from "../../src/infra/repository/UserRepositoryDatabase";

test("Should signup a user", async function () {
  const connection = new PgPromiseAdapter();
  await connection.connect();
  const userRepository = new UserRepositoryDatabase(connection);
  const input = {
    email: "joao@gmail.com",
    password: "abc123",
    date: new Date("2022-03-01T10:00:00")
  }
  await userRepository.clear(input.email);
  const repositoryFactory = new DatabaseRepositoryFactory(connection);
  const signup = new SignUp(repositoryFactory);
  await signup.execute(input);
  const login = new Login(repositoryFactory);
  const output = await login.execute(input);
  expect(output.token).toBe("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImpvYW9AZ21haWwuY29tIiwiaWF0IjoxNjQ2MTM5NjAwMDAwLCJleHBpcmVzSW4iOjEwMDAwMDB9.aHf1geyFbypi_-xreacJmHo8Fhh7c2hBdok_KCkEsG4");
  await connection.close()
})