import Coord from "../../domain/Coord";

export interface GeoLocation {
  getCoord(): Promise<Coord>;
}