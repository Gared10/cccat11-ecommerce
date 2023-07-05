import Verify from "../../src/application/usecase/Verify";

test("Should verify a user", async () => {
  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImpvYW9AZ21haWwuY29tIiwiaWF0IjoxNjQ2MTM5NjAwMDAwLCJleHBpcmVzSW4iOjEwMDAwMDB9.aHf1geyFbypi_-xreacJmHo8Fhh7c2hBdok_KCkEsG4"
  const verify = new Verify();
  const output = await verify.execute(token);
  expect(output.email).toBe("joao@gmail.com");
})