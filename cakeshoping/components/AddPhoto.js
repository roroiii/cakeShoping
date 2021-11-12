import { useState } from 'react';
import { styled, Box, Button, IconButton } from '@mui/material/';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import { auto } from '@popperjs/core';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
// import styled from 'styled-components';
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

export default function AddPhoto({
  fileSrc,
  handleUploadFile,
  handleClearFile,
  handleAddPhoto,
}) {
  return (
    <>
      <Box component="form">
        {fileSrc ? (
          <Box
            sx={{
              width: '33.33%',
              p: 2,
              position: 'relative',
              height: '180px',
              overflow: 'hidden',
            }}
          >
            <IconButton
              onClick={handleClearFile}
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

            <img src={fileSrc} style={{ width: '100%', height: '100%' }} />
          </Box>
        ) : (
          <Box sx={{ width: '33.33%', p: 2 }}>
            <label htmlFor="update-photos">
              <Input
                accept="image/*"
                id="update-photos"
                multiple
                type="file"
                onChange={handleUploadFile}
              />
              <AddPhotoButton component="span">+加入照片</AddPhotoButton>
            </label>
          </Box>
        )}
        <Button onClick={handleAddPhoto}>上傳圖片</Button>
      </Box>
    </>
  );
}
