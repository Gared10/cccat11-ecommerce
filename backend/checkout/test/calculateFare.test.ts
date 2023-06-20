import Coord from "../src/domain/entity/Coord";
import DistanceCalculator from "../src/domain/entity/DistanceCalculator";
import Product from "../src/domain/entity/Product"
import { calculateFare } from "../src/domain/entity/calculateFare"

let fromLocation;
let toLocation;
let from: Coord;
let to: Coord;
let distance: number;

beforeEach(() => {
  fromLocation = { CEP: "88015600", latitude: -27.5906685, longitude: -48.5605664 };
  toLocation = { CEP: "22030060", latitude: -9.610394, longitude: -35.725652 };
  from = new Coord(fromLocation.latitude, fromLocation.longitude);
  to = new Coord(toLocation.latitude, toLocation.longitude);
  distance = DistanceCalculator.calculate(from, to);
})

test('Should calculate products fare', function () {
  const product = new Product('Geladeira', 5000, 6, 10, 3, 30, 100)
  const fare: number = calculateFare(product, distance)

  expect(fare).toBe(72);
})

test('Should calculate minimal fare price', function () {
  const product = new Product('Geladeira', 1000, 6, 0.5, 0.1, 1, 0.1)
  const fare: number = calculateFare(product, distance)

  expect(fare).toBe(10);
})