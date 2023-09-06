import { setCookie } from "nookies";

export async function login(
    formData: { email: string, senha: string },
    setMensagemUsuario: (value: string) => void,
) {
    const headersList = {
        "Content-Type": "application/json"
    }
    const bodyContent = JSON.stringify({
        ...formData,
    });

    const response = await fetch(`${process.env.URL_FRONT}/api/user/login`, { 
        method: "POST",
        body: bodyContent,
        headers: headersList
    });
    
    const data = await response.text();
    const responseObj = JSON.parse(data)
    let mensagemUsuario = responseObj.message

    if (response.status === 200) {
        mensagemUsuario = 'Usuário logado com sucesso'
        setCookie(undefined, '@token', responseObj.message, {
            maxAge: 60 //Duração do cookies 1 minuto
        });
    }

    setMensagemUsuario(mensagemUsuario);
    return true;
}