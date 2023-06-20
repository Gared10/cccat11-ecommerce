import Product from "./Product";

export function calculateFare(product: Product, distance: number): number {
  const volume: number = product.getVolume();
  const density: number = product.getDensity();
  const fare: number = distance * volume * (density / 100);

  return fare >= 10 ? Math.round(fare) : 10;
}