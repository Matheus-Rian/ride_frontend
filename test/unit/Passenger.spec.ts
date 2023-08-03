import Passenger from "../../src/domain/Passenger"

test('Não deve criar um passageiro inválido', () => {
  expect(() => new Passenger('', '', '', '')).toThrow(new Error('Invalid Name.'));
})