import { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import { auto } from '@popperjs/core';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { styled } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import CloseIcon from '@mui/icons-material/Close';

const AddPhotoButton = styled(Button)`
  border: 1px dashed;
  width: 100%;
  height: 150px;
`;

const Input = styled('input')({
  display: 'none',
});

export default function ProductItem({ product, photos }) {
  const [isShow, setIsShow] = useState('1');

  const handleEditPost = () => {};
  const handleDelete = () => {};
  const handleIsShowClick = (e) => {
    setIsShow(e.target.value);
  };

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
            編輯商品 ID:{product.id}
          </Typography>
          <Button
            variant="contained"
            size="large"
            color="error"
            onClick={handleDelete}
          >
            刪除商品
          </Button>
        </Box>
        <Divider sx={{ pt: 3, mb: 2 }} />

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
          {photos.map((photo) => (
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
              <img src={photo.url} style={{ width: '100%', height: '100%' }} />
            </Box>
          ))}
          <Box sx={{ width: '33.33%', p: 2 }}>
            <label htmlFor="update-photos">
              <Input accept="image/*" id="update-photos" multiple type="file" />
              <AddPhotoButton component="span">+加入照片</AddPhotoButton>
            </label>
          </Box>
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
            defaultValue={product.productName}
          />
          <TextField
            disabled
            variant="filled"
            id="sell"
            label="銷售量"
            defaultValue={product.sell}
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
            defaultValue={product.price}
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
            defaultValue={product.storage}
          />

          <TextField
            required
            variant="filled"
            id="productType"
            label="類別"
            style={{ width: '22%' }}
            defaultValue={product.type}
          />
          <TextField
            required
            multiline
            style={{ width: '100%' }}
            rows={4}
            variant="filled"
            id="article"
            label="商品描述"
            defaultValue={product.articlel}
          />
          <FormGroup style={{ width: '100%' }}>
            <FormControlLabel
              value={product.isShow}
              control={<Switch defaultChecked />}
              label="上架"
              onClick={handleIsShowClick}
            />
          </FormGroup>
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
            onClick={handleEditPost}
          >
            送出
          </Button>
        </Box>
      </Box>
    </>
  );
}
