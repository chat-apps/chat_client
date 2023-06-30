import React, { useState } from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Link, useNavigate } from 'react-router-dom';
import { signUpApi } from '../../helpers/user.helper';
import { setItemToLocalStorage } from '../../utils';
import { useUserContext } from '../../context/user.context';
import { errorToast, successToast } from '../../utils/toast';

const SignUpPage = () => {
  const { handleSetUser, handleSetToken } = useUserContext();
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    let body = {
      name: data.get('name'),
      email: data.get('email'),
      password: data.get('password'),
    }

    handleSignUp(body);
  };

  const handleSignUp = async (body: any) => {
    setLoading(true)
    const response = await signUpApi(body)
    if (response?.success) {
        handleIfSuccess(response?.data, response?.token);
        successToast('Successfully Signup by new account')
      } else {
        errorToast(response)
      }
      setLoading(false)
  }

  const handleIfSuccess = (user: any, token: string) => {
    setItemToLocalStorage('user', JSON.stringify({ user, token }))
    handleSetToken(token);
    handleSetUser({ ID: user.ID, name: user.name })
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
            Sign Up
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="name"
              label="User Name"
              name="name"
              autoComplete="name"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
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
            disabled={loading}
            >
              Sign Up
            </Button>
            <Grid container>
              <Grid item xs>
              </Grid>
              <Grid item>
                <Typography>Do you have an account?
                    <Link to={'/login'}>
                        {" Sign In"}
                    </Link>
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
  );
}

export default SignUpPage