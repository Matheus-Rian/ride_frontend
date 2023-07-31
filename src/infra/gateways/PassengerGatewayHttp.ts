import PassengerGateway from "./PassengerGateway";
import HttpClient from "./http/HttpClient";

export default class PassengerGatewayHttp implements PassengerGateway {
  constructor (readonly httpClient: HttpClient) { }

  async save(passenger: any): Promise<void> {
    return await this.httpClient.post('http://localhost:3000/passengers', passenger);
  }
}