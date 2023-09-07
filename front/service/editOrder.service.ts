import { OrderDto } from "interfaces/orderDto.interface";

export async function editOrder(
    formData: OrderDto,
    orderId: string,
    setMensagemUsuario: (value: string) => void,
) {
    const headersList = {
        "Content-Type": "application/json"
    }
    const bodyContent = JSON.stringify({
        ...formData,
    });

    const response = await fetch(`${process.env.URL_FRONT}/api/order/${orderId}`, { 
        method: "PATCH",
        body: bodyContent,
        headers: headersList
    });
    
    const data = await response.text();
    const responseObj = JSON.parse(data)
    setMensagemUsuario(responseObj.message);
    return true;
}