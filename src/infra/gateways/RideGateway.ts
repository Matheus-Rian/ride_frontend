import Ride from "../../domain/Ride";

export default interface RideGateway {
  calculate (ride: Ride): Promise<number>;
}

export type CalculateRideInput = {
  positions: { lat: number, long: number, date: Date }[]
}