import { OrderDto } from "interfaces/orderDto.interface";
import { UserDto } from "interfaces/userDto.interface";

export async function createOrder(
    formData: OrderDto,
    setMensagemUsuario: (value: string) => void,
) {
    const headersList = {
        "Content-Type": "application/json"
    }
    const bodyContent = JSON.stringify({
        ...formData,
    });

    const response = await fetch(`${process.env.URL_FRONT}/api/order`, { 
        method: "POST",
        body: bodyContent,
        headers: headersList
    });
    
    const data = await response.text();
    const responseObj = JSON.parse(data)
    setMensagemUsuario(responseObj.message);
    return true;
}