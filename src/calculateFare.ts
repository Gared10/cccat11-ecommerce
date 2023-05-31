import Product from "./Product";

export function calculateFare(product: Product): number {
  const volume: number = product.getVolume();
  const density: number = product.getDensity();
  const fare: number = 1000 * volume * (density / 100);

  return fare >= 10 ? Math.round(fare) : 10;
}