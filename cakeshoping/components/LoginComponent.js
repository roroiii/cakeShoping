import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Button from '@mui/material/Button';

export default function LoginComponent({
  username,
  values,
  image,
  userText,
  loginErrorMessage,
  handleChangeUsername,
  handleChangePassword,
  handleClickShowPassword,
  handleMouseDownPassword,
  handleLogin,
}) {
  return (
    <div>
      <Box sx={{ display: 'flex' }}>
        <Card sx={{ maxWidth: 1200, height: 350 }}>
          <CardMedia
            component="img"
            height="auto"
            image={image}
            alt="green iguana"
          />
        </Card>
      </Box>
      <Box
        sx={{
          display: 'flex',
          textAlign: 'center',
          flexDirection: 'column',
          border: '1px solid rgba(0, 0, 0, 0.12)',
          borderRadius: '10px',
          padding: 6,
          marginTop: 3,
        }}
      >
        <Typography
          variant="body"
          color="text.secondary"
          sx={{ display: 'block', pt: 2 }}
        >
          {userText}
        </Typography>
        <Divider sx={{ pt: 1, mb: 2 }} />
        <Box
          component="form"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            mt: 2,
          }}
        >
          <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
            <InputLabel htmlFor="user">Username</InputLabel>
            <OutlinedInput
              id="user"
              value={username}
              onChange={handleChangeUsername}
              label="Username"
            />
          </FormControl>
          <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
            <InputLabel htmlFor="password">Password</InputLabel>
            <OutlinedInput
              id="password"
              type={values.showPassword ? 'text' : 'password'}
              value={values.password}
              onChange={handleChangePassword('password')}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {values.showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
            />
            {loginErrorMessage && (
              <FormHelperText error id="login-error">
                {loginErrorMessage}
              </FormHelperText>
            )}
          </FormControl>
          <Button
            variant="contained"
            size="large"
            sx={{ width: '100%', maxWidth: '284px', mt: 6 }}
            onClick={handleLogin}
          >
            登入
          </Button>
        </Box>
      </Box>
    </div>
  );
}
