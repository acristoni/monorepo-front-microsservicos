'use client'

import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import DataGridClients from '@/components/DataGrid';
import Button from '@mui/material/Button';
import getOrders from '../../../service/getOrders.service';
import { Order } from 'interfaces/order.interface';
import { Drawer } from '@mui/material';
import NewOrderForm from '@/components/NewOrderForm';
import { User } from 'interfaces/user.interface';
import getUsers from 'service/getUsers.service';

export default function Gestao() {
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [orderList, setOrderList] = useState<Order[]>();
  const [userList, setUserList] = useState<User[]>()
  console.log("🚀 ~ file: page.tsx:19 ~ Gestao ~ userList:", userList)
  // const [editClient, setEditClient] = useState<{ clientDto: ClientDto, idClient: string }>();
  
  useEffect(()=>{
    getOrders(setOrderList)
    getUsers(setUserList)
  },[]);

  // useEffect(()=>{
  //   if (editClient) {
  //     setIsDrawerOpen(true)
  //   }
  // },[editClient])

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
            <DataGridClients rows={orderList} userList={userList}/> :
            <Typography>
              Carregando informações...
            </Typography>
          }
        </>
        <Button 
          onClick={() => setIsDrawerOpen(!isDrawerOpen)} 
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
        <NewOrderForm setIsDrawerOpen={setIsDrawerOpen} userList={userList}/>
      </Drawer>
    </Box>
  );
}
