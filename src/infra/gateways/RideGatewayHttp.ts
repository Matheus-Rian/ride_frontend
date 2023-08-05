import Ride from "../../domain/Ride";
import RideGateway, { CalculateRideInput } from "./RideGateway";
import HttpClient from "./http/HttpClient";

export default class RideGatewayHttp implements RideGateway {
  constructor (readonly httpClient: HttpClient) {}

  async calculate(ride: Ride): Promise<number> {
    const input: CalculateRideInput = {
      positions: [
        { lat: ride.from.lat, long: ride.from.long, date: new Date() },
        { lat: ride.to.lat, long: ride.to.long, date: new Date() },
      ]
    }
    const output = await this.httpClient.post('http://localhost:3000/calculate_ride', input);
    return output.price;
  }
}