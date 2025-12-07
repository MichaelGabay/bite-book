import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useRef } from 'react';
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useAuth } from '../../Firebase';
import { useContext } from 'react';
import { ContextData } from '../../App';
import "./Login.css"

export default function SignUp() {

  const {loading , SetLoading , SetUser ,setLogInAcoount} = useContext(ContextData)

  const currentUser = useAuth();

  const email =useRef();
  const password =useRef();
  const name =useRef();
  const lastName =useRef();


  const auth = getAuth();


  const register = async function (){
    let userName = name.current.value + " " + lastName.current.value;
    SetLoading(true);
    await createUserWithEmailAndPassword(auth ,email.current.value , password.current.value)
    .then((userCredential) => {
    
      const user = userCredential.user;
      updateProfile(user,{displayName: userName });
      console.log(user);
      SetUser(user);
    })
    .catch((error) => {
      const errorCode = error.code;
      alert(errorCode);
      const errorMessage = error.message;
      console.log(errorMessage);
      SetLoading(false);
      // ..
    });
  
  }


const theme = createTheme();

  return (
    <div className="bgimg-modal">
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs" sx={{ py: 2, px: 3 }}>
        <CssBaseline  />
        <Box
          sx={{
            marginTop: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ 
            m: 0.5, 
            bgcolor: 'secondary.main',
            width: 48,
            height: 48,
            transition: 'all 0.3s ease',
            '&:hover': {
              transform: 'scale(1.1) rotate(5deg)',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
            }
          }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography 
            component="h1" 
            variant="h5"
            sx={{
              fontWeight: 600,
              color: '#1976d2',
              mb: 1.5,
              fontSize: '1.5rem'
            }}
          >
            Sign up
            {currentUser?.email && (
              <Typography variant="body2" sx={{ mt: 0.5, color: '#666', fontSize: '0.75rem' }}>
                {currentUser.email}
              </Typography>
            )}
          </Typography>
          <Box  noValidate  sx={{ mt: 1.5, width: '100%' }}>
            <Grid container spacing={1.5}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  inputRef={name}
                  required
                  fullWidth
                  size="small"
                  id="firstName"
                  label="First Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  size="small"
                  inputRef={lastName}
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  size="small"
                 inputRef={email}
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  size="small"
                  inputRef={password}
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
            </Grid>
            <Button
            onClick={register}
            disabled = {loading}
              fullWidth
              variant="contained"
              sx={{ 
                mt: 2, 
                mb: 2,
                py: 1.2,
                fontSize: '1rem',
                fontWeight: 600,
                borderRadius: 2,
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: '0 4px 12px rgba(25, 118, 210, 0.4)'
                },
                '&:active': {
                  transform: 'translateY(0)',
                  boxShadow: '0 2px 6px rgba(25, 118, 210, 0.3)'
                }
              }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end" className='mb-1'>
              <Grid item>
                <div className='link' onClick={()=>{setLogInAcoount(true)}}>
                  Already have an account? Sign in
                </div>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
    </div>
  );
}