import Passenger from "../../domain/Passenger";

export default interface PassengerGateway {
  create(passenger: Passenger): Promise<string>;
}

// DTO
export type CreatePassengerInput = {
  name: string,
  email: string,
  document: string
}