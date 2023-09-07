import { Order } from "interfaces/order.interface";
import { OrderDto } from "interfaces/orderDto.interface";

export default function handleEditButton(
    params: any, 
    setEditOrder: (editClient: { orderDto: OrderDto, idOrder: string }) => void,
    rows: Order[]
) {
    const order = rows.find(order => order.id === params.row.id)
    
    if (order) {
        const orderDto: OrderDto = {
            user_id: order.user_id,
            description: order.description,
            quantity: order.quantity,
            price: order.price,
        }
    
        setEditOrder({
            orderDto,
            idOrder: params.row.id
        })
    }
}