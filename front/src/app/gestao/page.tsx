'use client'

import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import DataGridClients from '@/components/DataGrid';
import Button from '@mui/material/Button';
import getOrders from '../../../service/getOrders.service';
import { Order } from 'interfaces/order.interface';
import { Drawer } from '@mui/material';
import OrderForm from '@/components/OrderForm';
import { User } from 'interfaces/user.interface';
import getUsers from 'service/getUsers.service';
import { OrderDto } from 'interfaces/orderDto.interface';

export default function Gestao() {
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [orderList, setOrderList] = useState<Order[]>();
  const [userList, setUserList] = useState<User[]>()
  const [editOrder, setEditOrder] = useState<{ orderDto: OrderDto, idOrder: string } | undefined>();
  
  useEffect(()=>{
    getOrders(setOrderList)
    getUsers(setUserList)
  },[]);

  useEffect(()=>{
    if (editOrder) {
      setIsDrawerOpen(true)
    }
  },[editOrder])

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'end'
      }}
    >
      <Box 
        sx={{
          borderRight: '1px solid #dcdcdc', 
          borderLeft: '1px solid #dcdcdc', 
          flexGrow: 2, 
          height: '690px',
          position: 'relative'
        }}
      >
        <>
          {
            orderList ?
            <DataGridClients 
              rows={orderList} 
              userList={userList}
              setEditOrder={setEditOrder}  
            /> :
            <Typography>
              Carregando informações...
            </Typography>
          }
        </>
        <Button 
          onClick={() => {
            setEditOrder(undefined)
            setIsDrawerOpen(!isDrawerOpen)
          }} 
          variant="contained" 
          color={ !isDrawerOpen ? "primary" : "error" }
          sx={{
            position: 'absolute',
            bottom: '10px',
            right: '10px'
          }}
          id="ButtonNewClient"
        >
          { !isDrawerOpen ? 'Novo Pedido' : 'Cancelar'}
        </Button>
      </Box>
      <Drawer
        anchor='right'
        open={isDrawerOpen}
      >
        <OrderForm 
          isDrawerOpen={isDrawerOpen}
          setIsDrawerOpen={setIsDrawerOpen} 
          userList={userList}
          editOrder={editOrder}
        />
      </Drawer>
    </Box>
  );
}
