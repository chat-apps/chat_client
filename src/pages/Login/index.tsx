import React, { FormEvent, useContext } from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Link, useNavigate } from 'react-router-dom';
import { loginApi } from '../../helpers/login.helper';
import { setItemToLocalStorage } from '../../utils';
import UserContext from '../../context/user.context';


const LoginPage = () => {
  const { handleSetToken, handleSetUser } = useContext(UserContext)
  const navigate = useNavigate()
  // const { socket, activeUsers, join } = useSocket(SOCKET_URL)

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    let body = {
      email: data.get('email'),
      password: data.get('password'),
    }

    handleLogin(body);
  };

  const handleLogin = async (body: any) => {
    await loginApi(body).then((res: any) => {
      if (res.data.success) {
        handleIfSuccess(res?.data?.data, res?.data?.token);
      } else {
        console.error(JSON.stringify(res));
      }
    }).catch((error) => {
      alert(error?.response?.data?.error);
    })
  }
  
  const handleIfSuccess = (user: any, token: string) => {
    setItemToLocalStorage('user', JSON.stringify({ user, token }))
    handleSetToken(token);
    handleSetUser({ ID: user.ID, name: user.name})
    navigate('/')
  }

  return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography variant="h5" textTransform={"uppercase"} fontWeight={700}>
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, py: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
              </Grid>
              <Grid item>
                <Typography>Don't have an account?
                    <Link to={'/signup'}>
                        {" Sign Up"}
                    </Link>
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
  );
}
export default LoginPage
