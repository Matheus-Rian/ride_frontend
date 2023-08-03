import Name from "../../src/domain/Name"

test('Deve criar um nome válido', () => {
  const name = new Name('Matheus Rian');
  expect(name.getValue()).toBe('Matheus Rian');
})

test('Não deve criar um nome válido', () => {
  expect(() => new Name('Matheus')).toThrow(new Error('Invalid Name.'));
})