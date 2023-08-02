import Driver from "../../domain/Driver";
import DriverGateway from "./DriverGateway";
import HttpClient from "./http/HttpClient";

export default class DriverGatewayHttp implements DriverGateway {
  constructor (readonly httpClient: HttpClient) { }

  async save (driver: Driver) {
    const driverData = await this.httpClient.post('http://localhost:3000/drivers', driver);
    return driverData.driverId;
  }
}