import Driver from "../../domain/Driver";
import DriverGateway, { CreateDriverInput } from "./DriverGateway";
import HttpClient from "./http/HttpClient";

export default class DriverGatewayHttp implements DriverGateway {
  constructor (readonly httpClient: HttpClient) { }

  async create (driver: Driver) {
    const input: CreateDriverInput = {
      name: driver.name.getValue(),
      email: driver.email.getValue(),
      document: driver.document.getValue(),
      carPlate: driver.carPlate.getValue(),
    }

    const driverData = await this.httpClient.post('http://localhost:3000/drivers', input);
    return driverData.driverId;
  }
}