export class ValidacaoEmail {
  validar(email: string): boolean {
    // Verifique se o email não está vazio
    if (!email || email.trim() === '') {
      return false;
    }

    // Use uma expressão regular simples para verificar o formato do email
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    if (!emailRegex.test(email)) {
      return false;
    }

    // Verifique se o email não é muito longo (ajuste conforme necessário)
    if (email.length > 100) {
      return false;
    }

    return true;
  }
}
