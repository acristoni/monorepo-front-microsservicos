import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import { OrderDto } from "interfaces/orderDto.interface";
import { SelectUsers } from "interfaces/selectUsers.interface";
import { useEffect, useState } from "react";
import { createOrder } from "service/createOrder.service";
import ModalComplete from "./ModalComplete";
import { User } from "interfaces/user.interface";

type Props = {
    setIsDrawerOpen: (value: boolean) => void;
    userList: User[] | undefined
}

export default function NewOrderForm({ setIsDrawerOpen, userList }: Props) {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [mensagemUsuario, setMensagemUsuario] = useState<string>('');
    const [allUsers, setAllUsers] = useState<SelectUsers[]>([
        {
            nome: 'João',
            id: '123asd123asd1'
        },
        {
            nome: 'Maria',
            id: 'asd123asd123'
        }
    ]);
    const [formData, setFormData] = useState<OrderDto>({
        "user_id": "",
        "description": "",
        "quantity": 0,
        "price": 0
    });

    const handleChange = (e: any) => {
        const { name, value }: { name: string; value: string } = e.target;
        
        if ( name === "price" ) {
            setFormData({ ...formData, [name]: parseFloat(value)  });
        } else if ( name === "quantity" ) {
            setFormData({ ...formData, [name]: parseInt(value)  });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const saveNewOrder = async() => {
        const responseNewOrder = await createOrder(formData, setMensagemUsuario)
        if (responseNewOrder) {
            setIsModalOpen(true)
        }
    }

    useEffect(()=>{
        if (userList && userList.length) {
            const optionsSelectUser = userList.map(user => {
                const option: SelectUsers = {
                    nome: `${user.first_name} ${user.last_name}`,
                    id: user.id
                };

                return option;
            })
            setAllUsers(optionsSelectUser)
        }
    },[userList])

    return (
        <Box
          width="400px"
          display="flex"
          flexDirection="column"
          alignItems="center"
          pt='100px'
          px={3}
        >
            <ModalComplete 
                setIsModalOpen={setIsModalOpen} 
                isModalOpen={isModalOpen} 
                mensagemUsuario={mensagemUsuario} 
            />
            <Typography 
                fontWeight={700} 
                fontSize="25px"         
                sx={{ marginBottom: 5 }}
            > 
                Novo Pedido
            </Typography>
            <FormControl fullWidth>
                <InputLabel 
                    htmlFor="user_id" 
                    sx={{backgroundColor: 'white', px: 1}}
                >
                    Usuário Responsável
                </InputLabel>
                <Select
                    name="user_id"
                    value={formData.user_id}
                    onChange={handleChange}
                    sx={{ marginBottom: 5 }}
                >
                    {allUsers.map((option: SelectUsers) => (
                    <MenuItem key={option.id} value={option.id}>
                        {option.nome}
                    </MenuItem>
                    ))}
                </Select>
            </FormControl>
            <TextField
                name="description"
                label="Descrição do Pedido"
                fullWidth
                value={formData.description}
                onChange={handleChange}
                sx={{ marginBottom: 5 }}
            />
            <TextField
                name="quantity"
                label="Quantidade"
                fullWidth
                value={formData.quantity}
                onChange={handleChange}
                sx={{ marginBottom: 5 }}
                type="number"
            />
            <TextField
                name="price"
                label="Preço"
                fullWidth
                value={formData.price}
                onChange={handleChange}
                sx={{ marginBottom: 5 }}
                type="number"
            />
            <Button
                variant="contained" 
                onClick={saveNewOrder}
                color="primary"
                sx={{ marginBottom: 2 }}
            >
                SALVAR
            </Button>
            <Button
                variant="contained" 
                onClick={()=>setIsDrawerOpen(false)}
                color="error"
            >
                FECHAR
            </Button>
        </Box>
    )
}