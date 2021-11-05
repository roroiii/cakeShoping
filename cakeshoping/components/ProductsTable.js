import { useState } from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';

import { styled } from '@mui/material/styles';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.secondary.main,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const EnhancedTableToolbar = (props) => {
  return (
    <Toolbar
      sx={{
        display: 'flex',
        justifyContent: 'space-around',
        width: '100%',
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
      }}
    >
      <Typography
        sx={{ flex: '1 1 100%' }}
        variant="h6"
        id="tableTitle"
        component="div"
      >
        商品管理
      </Typography>

      <Tooltip title="Filter list">
        <Button variant="contained">新增</Button>
      </Tooltip>
    </Toolbar>
  );
};

function TablePaginationActions({ count, page, rowsPerPage, onPageChange }) {
  const theme = useTheme();

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === 'rtl' ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

export default function ProductsTable({ productAndOnePhoto }) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const emptyRows =
    page > 0
      ? Math.max(0, (1 + page) * rowsPerPage - productAndOnePhoto.length)
      : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <>
      <EnhancedTableToolbar />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 680 }} aria-label="table">
          <TableHead>
            <TableRow>
              <StyledTableCell>商品圖片</StyledTableCell>
              <StyledTableCell align="left">商品名稱</StyledTableCell>
              <StyledTableCell align="right">價格</StyledTableCell>
              <StyledTableCell align="right">類別</StyledTableCell>
              <StyledTableCell align="right">是否上架</StyledTableCell>
              <StyledTableCell align="right">庫存</StyledTableCell>
              <StyledTableCell align="right">賣出</StyledTableCell>
              <StyledTableCell align="center">操作</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? productAndOnePhoto.slice(
                  page * rowsPerPage,
                  page * rowsPerPage + rowsPerPage
                )
              : productAndOnePhoto
            ).map((row) => (
              <TableRow
                key={row.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.url ? (
                    <div
                      style={{
                        display: 'block',
                        width: '220px',
                        height: '140px',
                        maxWidth: '220px',
                        overflow: 'hidden',
                        background: '#e8e8e8',
                      }}
                    >
                      <img src={row.url} alt="" style={{ width: '100%' }} />
                    </div>
                  ) : (
                    <div
                      style={{
                        display: 'block',
                        width: '220px',
                        height: '160px',
                        maxWidth: '220px',
                        background: '#e8e8e8',
                      }}
                    ></div>
                  )}
                </TableCell>
                <TableCell align="left">{row.productName}</TableCell>
                <TableCell align="right">{row.price}</TableCell>
                <TableCell align="right">{row.type}</TableCell>
                <TableCell align="right">{row.isShow ? 'O' : 'X'}</TableCell>
                <TableCell align="right">
                  {row.storage > 0 ? row.storage : '-'}
                </TableCell>
                <TableCell align="right">
                  {row.sell > 0 ? row.sell : '-'}
                </TableCell>
                <TableCell align="right">
                  <Button
                    variant="contained"
                    href={`/admin/products/${row.id}`}
                    sx={{ mr: 1 }}
                  >
                    編輯
                  </Button>
                  <Button variant="outlined">下架</Button>
                </TableCell>
              </TableRow>
            ))}
            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[10, 25, { label: 'All', value: -1 }]}
                colSpan={8}
                count={productAndOnePhoto.length}
                rowsPerPage={rowsPerPage}
                page={page}
                SelectProps={{
                  inputProps: {
                    'aria-label': 'rows per page',
                  },
                  native: true,
                }}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </>
  );
}
