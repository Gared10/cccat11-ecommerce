import TokenGenerator from "../../src/domain/entity/TokenGenerator"
import User from "../../src/domain/entity/User";

test("Should sign a token", async () => {
  const tokenGenerator = new TokenGenerator("secret");
  const user = User.create("joao@gmail.com", "abc123");
  const token = tokenGenerator.sign(user, new Date("2022-03-01T10:00:00"));
  expect(token).toBe("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImpvYW9AZ21haWwuY29tIiwiaWF0IjoxNjQ2MTM5NjAwMDAwLCJleHBpcmVzSW4iOjEwMDAwMDB9.aHf1geyFbypi_-xreacJmHo8Fhh7c2hBdok_KCkEsG4");
})

test("Should verificar a token", async () => {
  const tokenGenerator = new TokenGenerator("secret");
  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImpvYW9AZ21haWwuY29tIiwiaWF0IjoxNjQ2MTM5NjAwMDAwLCJleHBpcmVzSW4iOjEwMDAwMDB9.aHf1geyFbypi_-xreacJmHo8Fhh7c2hBdok_KCkEsG4";
  const output = await tokenGenerator.verify(token);
  expect(output.email).toBe("joao@gmail.com");
})