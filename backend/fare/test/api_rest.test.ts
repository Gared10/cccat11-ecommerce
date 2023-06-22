import axios from "axios";

axios.defaults.validateStatus = function () {
  return true;
}

test('Should calculate fare', async function () {
  const fare = {
    from: { CEP: "88015600", latitude: -27.5906685, longitude: -48.5605664 },
    to: { CEP: "22030060", latitude: -9.610394, longitude: -35.725652 },
    items: [
      { "idProduct": 1, "quantity": 2 },
      { "idProduct": 2, "quantity": 5 },
      { "idProduct": 3, "quantity": 1 }
    ]
  }

  const response = await axios.get("http://localhost:3002/simulateFare", { data: fare })

  expect(response.data.fare).toBe(1060);
})