export function calculateFare(height: number, width: number, product_length: number, weight: number): number {
  const volume: number = height * width * product_length;
  const density: number = weight / volume;
  const fare: number = 1000 * volume * (density / 100);

  return fare >= 10 ? Math.round(fare) : 10;
}