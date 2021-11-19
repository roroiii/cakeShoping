import { useState } from 'react';
import { auto } from '@popperjs/core';
import PropTypes from 'prop-types';
import {
  Box,
  Toolbar,
  Paper,
  Button,
  IconButton,
  TextField,
  Typography,
  Divider,
  styled,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableFooter,
  TableRow,
  TablePagination,
} from '@mui/material/';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.secondary.main,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

export default function ProductItem({ title, order }) {
  return (
    <>
      <Box component={Paper} sx={{ p: 2 }}>
        <Box
          sx={{
            width: '100%',
            maxWidth: { xs: auto, md: 600 },
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: { xs: 'wrap' },
            padding: '0 10px',
          }}
        >
          <Typography variant="body" color="text.secondary">
            {title}
          </Typography>
        </Box>
        <Divider sx={{ pt: 3, mb: 2 }} />
        <Box sx={{ mb: 2 }}>
          {/* <Typography variant="body" color="text.secondary">
            訂單編號：{order && order[0].orderid}
          </Typography>
          <Typography variant="body" color="text.secondary">
            會員ID：{order && order[0].userId}
          </Typography> */}
          <TextField
            disabled
            id="orderid"
            label="訂單編號"
            value={order && `${order[0].orderid}`}
            variant="standard"
          />
          <TextField
            disabled
            id="userId"
            label="會員ID"
            value={order && `${order[0].userId}`}
            variant="standard"
          />
          <TextField
            disabled
            id="userId"
            label="商品數量"
            value={order && `${order[0].count}`}
            variant="standard"
          />
          <TextField
            disabled
            id="userId"
            label="總金額"
            value={order && `${order[0].totalPrice}`}
            variant="standard"
          />
        </Box>
        <Box>
          <TableContainer>
            <Table sx={{ minWidth: 680 }} aria-label="table">
              <TableHead>
                <TableRow>
                  <TableCell align="left">ID</TableCell>
                  <TableCell align="left">商品名稱</TableCell>
                  <TableCell align="right">單價</TableCell>
                  <TableCell align="right">狀態</TableCell>
                  <TableCell align="right">會員ID</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {order &&
                  order.map((row) => (
                    <TableRow
                      key={row.id}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell align="left">{row.id}</TableCell>
                      <TableCell align="left">{row.productName}</TableCell>
                      <TableCell align="right">{row.unitPrice}</TableCell>
                      <TableCell align="right">{row.status}</TableCell>
                      <TableCell align="right">{row.userId}</TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
    </>
  );
}
