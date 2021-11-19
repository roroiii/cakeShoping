import { styled, Box, Button, IconButton } from '@mui/material/';
import { auto } from '@popperjs/core';
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
  photos,
  photoSrc,
  handleUploadFile,
  handleAddPhoto,
  handleDeletePhoto,
}) {
  return (
    <>
      <Box
        component="form"
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
              <img src={photo.url} style={{ width: '100%', height: '100%' }} />
            </Box>
          ))}
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
        {/* <Button onClick={handleAddPhoto}>更新圖片</Button> */}
      </Box>
    </>
  );
}
