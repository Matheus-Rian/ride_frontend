import Driver from "../../domain/Driver";

export default interface DriverGateway {
  create(driver: Driver): Promise<string>;
}

// DTO
export type CreateDriverInput = {
  name: string,
  email: string,
  document: string, 
  carPlate: string,
}
