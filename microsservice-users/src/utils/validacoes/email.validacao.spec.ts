import { ValidacaoEmail } from './email.validacao';

describe('Validação email', () => {
  const validacaoEmail = new ValidacaoEmail();

  it('Verifica se o email não está vazio', () => {
    expect(validacaoEmail.validar('')).toBeFalsy();
  });

  it('Email válido, exemplo: "exemplo@email.com"', () => {
    expect(validacaoEmail.validar('exemplo@email.com')).toBeTruthy();
  });

  it('Email inválido, exemplo: "email.invalido.com"', () => {
    expect(validacaoEmail.validar('email.invalido.com')).toBeFalsy();
  });

  it('Email inválido, exemplo: "email@.com"', () => {
    expect(validacaoEmail.validar('email@.com')).toBeFalsy();
  });

  it('Email inválido, exemplo: "email.com"', () => {
    expect(validacaoEmail.validar('email.com')).toBeFalsy();
  });

  it('Email inválido, exemplo: "email@.com.br."', () => {
    expect(validacaoEmail.validar('email@.com.br.')).toBeFalsy();
  });

  it('Verifica se o email não é muito longo', () => {
    expect(
      validacaoEmail.validar(
        'exemplo1234567890abcdefghijklmnopqadaserggatwsvvafvasdfvarvzdxbvargfrstuvwxyzabcdefghijklmnopqrstuvwxyz@example.com',
      ),
    ).toBeFalsy();
  });

  it('Email válido, exemplo: "email@subdominio.com"', () => {
    expect(validacaoEmail.validar('email@subdominio.com')).toBeTruthy();
  });
});
