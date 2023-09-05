export class ValidacaoNumeroTelefone {
  validar(telefone: string): boolean {
    // Remova todos os caracteres não numéricos do número de telefone
    const numeroLimpo = telefone.replace(/\D/g, '');

    // Verifique se o número de telefone tem pelo menos 10 dígitos (ajuste conforme necessário)
    if (numeroLimpo.length < 10) {
      return false;
    }
    return true;
  }
}
