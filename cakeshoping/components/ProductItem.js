import { useState } from 'react';
import { auto } from '@popperjs/core';
import CloseIcon from '@mui/icons-material/Close';
import AddPhoto from './AddPhoto';
import {
  Box,
  TextField,
  Paper,
  Button,
  IconButton,
  Typography,
  Divider,
  FormGroup,
  FormControlLabel,
  Switch,
  styled,
} from '@mui/material/';

const AddPhotoButton = styled(Button)`
  border: 1px dashed;
  width: 100%;
  height: 150px;
`;

const Input = styled('input')({
  display: 'none',
});

export default function ProductItem({
  photos,
  productName,
  type,
  price,
  articlel,
  isShow,
  storage,
  sell,
  id,
  setProductName,
  setType,
  setPrice,
  setArticlel,
  setStorage,
  setSell,
  isDeleted,
  title,
  handleAddProduct,
  handleUpdateProduct,
  handleDeletePhoto,
  handleDeleteProduct,
  handleIsShowClick,
  fileSrc,
  photoSrc,
  handleAddPhoto,
  handleUploadFile,
  handleClearFile,
}) {
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
            {id}
          </Typography>
          {!isDeleted && (
            <Button
              variant="contained"
              size="large"
              color="error"
              onClick={() => handleDeleteProduct(id)}
            >
              刪除商品
            </Button>
          )}
        </Box>
        <Divider sx={{ pt: 3, mb: 2 }} />
        {isDeleted === 1 && <span>商品已刪除</span>}
        {!isDeleted && (
          <>
            <Box
              sx={{
                width: '100%',
                maxWidth: { xs: auto, md: 600 },
                display: 'flex',
                justifyContent: 'start',
                alignItems: 'start',
                flexWrap: { xs: 'wrap' },
                padding: '0 10px',
              }}
            >
              {photos &&
                photos.map((photo) => (
                  <Box
                    sx={{
                      width: '33.33%',
                      p: 2,
                      position: 'relative',
                      height: '180px',
                      overflow: 'hidden',
                    }}
                    key={photo.id}
                  >
                    <IconButton
                      onClick={() => handleDeletePhoto(photo.id)}
                      aria-label="delete"
                      variant="contained"
                      sx={{
                        width: '28px',
                        height: '28px',
                        background: '#d0d0d0',
                        color: '#fff',
                        position: 'absolute',
                        top: 0,
                        right: 0,
                      }}
                    >
                      <CloseIcon />
                    </IconButton>
                    <img
                      src={photo.url}
                      style={{ width: '100%', height: '100%' }}
                    />
                  </Box>
                ))}
              <AddPhoto
                fileSrc={fileSrc}
                handleUploadFile={handleUploadFile}
                handleClearFile={handleClearFile}
              />
            </Box>
            <Divider sx={{ pt: 1, mb: 2 }} />
            <Box
              component="form"
              sx={{
                '& .MuiTextField-root': { m: 1, width: '25ch' },
                maxWidth: { xs: auto, md: 600 },
                display: 'flex',
                justifyContent: 'space-between',
                flexWrap: { xs: 'wrap' },
              }}
              noValidate
              autoComplete="off"
            >
              <TextField
                required
                variant="filled"
                id="productName"
                label="商品名稱"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
              />
              <TextField
                disabled
                variant="filled"
                id="sell"
                label="銷售量"
                value={sell || 0}
                onChange={(e) => setSell(e.target.value)}
              />
              <TextField
                required
                variant="filled"
                id="price"
                label="價格"
                type="number"
                InputLabelProps={{
                  shrink: true,
                }}
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
              <TextField
                required
                variant="filled"
                id="storage"
                label="庫存"
                type="number"
                style={{ width: '22%' }}
                InputLabelProps={{
                  shrink: true,
                }}
                value={storage || 0}
                onChange={(e) => setStorage(e.target.value)}
              />

              <TextField
                required
                variant="filled"
                id="productType"
                label="類別"
                style={{ width: '22%' }}
                value={type}
                onChange={(e) => setType(e.target.value)}
              />
              <TextField
                required
                multiline
                style={{ width: '100%' }}
                rows={4}
                variant="filled"
                id="articlel"
                label="商品描述"
                value={articlel}
                onChange={(e) => setArticlel(e.target.value)}
              />
              <Switch checked={isShow} onChange={handleIsShowClick} />
              {id ? (
                <Button
                  variant="contained"
                  size="large"
                  sx={{
                    width: '100%',
                    maxWidth: '284px',
                    mt: 6,
                    mb: 6,
                    marginRight: 'auto',
                    marginLeft: 'auto',
                  }}
                  onClick={() => {
                    const data = {
                      productName: productName.toString(),
                      type: type.toString(),
                      price: price.toString(),
                      articlel: articlel.toString(),
                      isShow: isShow ? '1' : '0',
                      storage: storage.toString(),
                      sell: sell.toString(),
                      id: id.toString(),
                    };
                    handleUpdateProduct(data);
                  }}
                >
                  送出
                </Button>
              ) : (
                <Button
                  variant="contained"
                  size="large"
                  sx={{
                    width: '100%',
                    maxWidth: '284px',
                    mt: 6,
                    mb: 6,
                    marginRight: 'auto',
                    marginLeft: 'auto',
                  }}
                  onClick={() => {
                    const data = {
                      productName: productName.toString(),
                      type: type.toString(),
                      price: price.toString(),
                      articlel: articlel.toString(),
                      isShow: isShow ? '1' : '0',
                      storage: storage.toString(),
                      sell: sell.toString(),
                    };

                    handleAddProduct(data, newPhoto);
                  }}
                >
                  新增
                </Button>
              )}
            </Box>
          </>
        )}
      </Box>
    </>
  );
}
