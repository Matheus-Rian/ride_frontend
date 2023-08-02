import Passenger from "../../domain/passenger/Passenger";
import PassengerGateway from "./PassengerGateway";
import HttpClient from "./http/HttpClient";

export default class PassengerGatewayHttp implements PassengerGateway {
  constructor (readonly httpClient: HttpClient) { }

  async save(passenger: Passenger): Promise<string> {
    const passengerData = await this.httpClient.post('http://localhost:3000/passengers', passenger);
    return passengerData.passengerId;
  }
}