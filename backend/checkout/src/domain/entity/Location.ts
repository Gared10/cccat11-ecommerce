import Coord from "./Coord";

export default class Location {
  constructor(readonly CEP: string, readonly latitude: number, readonly longitude: number) {
  }

  getCoords() {
    return new Coord(this.latitude, this.longitude);
  }
}