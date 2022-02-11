import { auto } from "@popperjs/core";
import {
  Box,
  Paper,
  TextField,
  Typography,
  Divider,
  styled,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material/";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";

const TitleTextField = ({ classID, label, value }) => {
  return (
    <TextField
      disabled
      id={classID}
      label={label}
      value={value}
      variant="standard"
      sx={{
        "& .Mui-disabled": {
          color: "#333 !important",
          textFillColor: "#333 !important",
        },
        "& .MuiInput-root": {
          color: "#333 !important",
        },
      }}
    />
  );
};

export default function ProductItem({ title, order }) {
  const totalProducts = () => {
    if (order) {
      let total = 0;
      for (let i = 0; i < order.length; i++) {
        total += order[i].count;
      }
      return total;
    }
  };
  const totalCount = totalProducts();
  const productPrices = (count, unitPrice) => {
    return count * unitPrice;
  };

  return (
    <>
      <Box component={Paper} sx={{ p: 2 }}>
        <Box
          sx={{
            width: "100%",
            maxWidth: { xs: auto, md: 600 },
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: { xs: "wrap" },
            padding: "0 10px",
          }}
        >
          <Typography variant="body" color="text.secondary">
            {title}
          </Typography>
        </Box>
        <Divider sx={{ pt: 3, mb: 2 }} />
        <Box sx={{ mb: 2 }}>
          <TitleTextField
            classID={"orderId"}
            label={"訂單編號"}
            value={order && `${order[0].orderid}`}
          />
          <TitleTextField
            classID={"userId"}
            label={"會員ID"}
            value={order && `${order[0].userId}`}
          />
          <TitleTextField
            classID={"totalProduct"}
            label={"商品總數量"}
            value={order && `${totalCount}`}
          />
          <TitleTextField
            classID={"totalPrice"}
            label={"總金額"}
            value={order && `${order[0].totalPrice}`}
          />
          <TitleTextField
            classID={"status"}
            label={"狀態"}
            value={order && `${order[0].status === "0" ? "未完成" : "已完成"}`}
          />
        </Box>
        <Box>
          <TableContainer>
            <Table sx={{ minWidth: 680 }} aria-label="table">
              <TableHead>
                <TableRow>
                  <TableCell align="left">編號</TableCell>
                  <TableCell align="left">商品名稱</TableCell>
                  <TableCell align="right">單價</TableCell>
                  <TableCell align="right">價格</TableCell>
                  <TableCell align="right">數量</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {order &&
                  order.map((row) => (
                    <TableRow
                      key={row.id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell align="left">{row.id}</TableCell>
                      <TableCell align="left">{row.productName}</TableCell>
                      <TableCell align="right">{row.unitPrice}</TableCell>
                      <TableCell align="right">
                        {productPrices(row.count, row.unitPrice)}
                      </TableCell>
                      <TableCell align="right">{row.count}</TableCell>
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
