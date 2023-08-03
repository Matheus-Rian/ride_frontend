import Passenger from "../../domain/Passenger";
import PassengerGateway, { CreatePassengerInput } from "./PassengerGateway";
import HttpClient from "./http/HttpClient";

export default class PassengerGatewayHttp implements PassengerGateway {
  constructor (readonly httpClient: HttpClient) { }

  async create(passenger: Passenger): Promise<string> {
    const input: CreatePassengerInput = {
      document: passenger.document.getValue(),
      email: passenger.email.getValue(),
      name: passenger.name.getValue()
    }
    const passengerData = await this.httpClient.post('http://localhost:3000/passengers', input);
    return passengerData.passengerId;
  }
}