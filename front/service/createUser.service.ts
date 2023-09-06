import { UserDto } from "interfaces/userDto.interface";

export async function createUser(
    formData: UserDto,
    setMensagemUsuario: (value: string) => void,
) {
    const headersList = {
        "Content-Type": "application/json"
    }
    const bodyContent = JSON.stringify({
        ...formData,
    });

    const response = await fetch(`${process.env.URL_FRONT}/api/user`, { 
        method: "POST",
        body: bodyContent,
        headers: headersList
    });
    
    const data = await response.text();
    const responseObj = JSON.parse(data)
    setMensagemUsuario(responseObj.message);
    return true;
}