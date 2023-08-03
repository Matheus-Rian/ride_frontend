import Driver from "../../src/domain/Driver";

test('Não deve criar um motorista com nome inválido', () => {
  expect(() => new Driver('', '', '', '', '')).toThrow(new Error('Invalid Name.'));
})

test('Não deve criar um motorista com email inválido', () => {
  expect(() => new Driver('', 'John Doe', '', '', '')).toThrow(new Error('Invalid Email.'));
})

test('Não deve criar um motorista com documento inválido', () => {
  expect(() => new Driver('', 'John Doe', 'john.doe@gmail.com', '', '')).toThrow(new Error('Invalid Cpf.'));
})

test('Não deve criar um motorista com placa do carro inválida', () => {
  expect(() => new Driver('', 'John Doe', 'john.doe@gmail.com', '83432616074', '')).toThrow(new Error('Invalid car plate.'));
})