import { ValidacaoNumeroTelefone } from './numeroTelefone.validacao';

describe('Validação número de telefone', () => {
  const validacaoTelefone = new ValidacaoNumeroTelefone();

  it('Verifica se o número de telefone não está vazio', () => {
    expect(validacaoTelefone.validar('')).toBeFalsy();
  });

  it('Número de telefone válido, exemplo "1234567890", deve retornar verdadeiro', () => {
    expect(validacaoTelefone.validar('1234567890')).toBeTruthy();
  });

  it('Número de telefone válido com caracteres não numéricos, exemplo "(123) 456-7890", deve retornar verdadeiro após remoção dos caracteres não numéricos', () => {
    expect(validacaoTelefone.validar('(123) 456-7890')).toBeTruthy();
  });

  it('Número de telefone inválido com menos de 10 dígitos, exemplo "12345", deve retornar falso', () => {
    expect(validacaoTelefone.validar('12345')).toBeFalsy();
  });

  it('Número de telefone inválido com caracteres não numéricos e menos de 10 dígitos, exemplo "(123) ABC-DEF", deve retornar falso', () => {
    expect(validacaoTelefone.validar('(123) ABC-DEF')).toBeFalsy();
  });

  it('Número de telefone válido com exatamente 10 dígitos, exemplo "9876543210", deve retornar verdadeiro', () => {
    expect(validacaoTelefone.validar('9876543210')).toBeTruthy();
  });
});
