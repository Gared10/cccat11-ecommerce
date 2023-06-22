import axios from "axios";
import crypto from 'crypto';

axios.defaults.validateStatus = function () {
  return true;
}

test('Should list one product', async function () {
  const response = await axios.get("http://localhost:3001/products/1")
  expect(response.data.idProduct).toBe(1);
  expect(response.data.description).toBe("Camera");
  expect(response.data.width).toBe(15);
  expect(response.data.weight).toBe(1);
  expect(response.data.height).toBe(10);
  expect(response.data.product_length).toBe(20);
  expect(response.data.volume).toBe(3000);
  expect(response.data.density).toBe(0.0003333333333333333);
})

test('Should list all product', async function () {
  const response = await axios.get("http://localhost:3001/products")
  expect(response.data.length).toBe(4);
})
