import axios from "axios";

test('Should verify a user', async function () {
  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImpvYW9AZ21haWwuY29tIiwiaWF0IjoxNjQ2MTM5NjAwMDAwLCJleHBpcmVzSW4iOjEwMDAwMDB9.aHf1geyFbypi_-xreacJmHo8Fhh7c2hBdok_KCkEsG4"
  const response = await axios.post("http://localhost:3004/verify", { token })

  expect(response.data.email).toBe("joao@gmail.com");
})