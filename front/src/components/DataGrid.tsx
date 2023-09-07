import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef, ptBR } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit'; 
import { Order } from 'interfaces/order.interface';
import { OrderFormated } from 'interfaces/orderFormated.interface';
import { User } from 'interfaces/user.interface';
import { OrderDto } from 'interfaces/orderDto.interface';
import handleEditButton from 'utils/handleEditButton';

type Props =  {
  rows: Order[];
  userList: User[] | undefined;
  setEditOrder: (editClient: { orderDto: OrderDto, idOrder: string }) => void;
}

export default function DataGridClients({ rows, userList, setEditOrder }: Props) {
  const [rowsFormated, setRowsFormated] = useState<OrderFormated[]>([])

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 100 },
    {
      field: 'responsable',
      headerName: 'Responsável',
      width: 200,
    },
    {
      field: 'description',
      headerName: 'Descrição',
      width: 300,
    },
    {
      field: 'quantity',
      headerName: 'Quantidade',
      width: 10,
      type: 'number'
    },
    {
      field: 'price',
      headerName: 'Preço',
      width: 100,
    },
    {
      field: 'updatedAt',
      headerName: 'Atualização',
      description: 'Essa é a data da última atualização do pedido no nosso sistema.',
      width: 100,
      type: 'date'
    },
    {
      field: 'createdAt',
      headerName: 'Criação',
      description: 'Essa é a data que o pedido foi registrado no nosso sistema.',
      width: 100,
      type: 'date'
    },
    {
      field: 'edit',
      headerName: 'Editar',
      width: 100,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <button
        id="ButtonEditar"
          onClick={()=>handleEditButton(params, setEditOrder, rows)}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          <EditIcon color="primary" />
        </button>
      ),
    },
  ];

  useEffect(()=>{
    if (rows && rows.length && userList && userList.length) {
      const arrayRowsFormated = rows.map((orderInfo: Order) => {
        const userResponsable = userList.find(user => user.id === orderInfo.user_id);
        return {
          ...orderInfo,
          responsable: 
            userResponsable?.first_name ? `${userResponsable.first_name} ${userResponsable.last_name}` : 'Usuário não cadastrado',
          price: `R$ ${orderInfo.price}`,
          updatedAt: new Date(orderInfo.updatedAt),
          createdAt: new Date(orderInfo.createdAt)
        }  
      })
      setRowsFormated(arrayRowsFormated);
    }
  },[rows])

  return (
    <Box sx={{ height: 630, width: '100%' }}>
      <DataGrid
        rows={rowsFormated}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
            },
          },
        }}
        pageSizeOptions={[10]}
        disableRowSelectionOnClick
        localeText={ptBR.components.MuiDataGrid.defaultProps.localeText}
      />
    </Box>
  );
}
