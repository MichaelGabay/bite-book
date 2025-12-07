import React, { useContext } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { login } from "../../Firebase";
import { useRef } from "react";
import { ContextData } from "../../App";
import "./Login.css"

const theme = createTheme();

export default function LoginPas() {
  const { loading, SetLoading ,SetUser , setLogInAcoount ,setPas } = useContext(ContextData);

  const email = useRef();
  const password = useRef();

  async function handelLogIn() {
    SetLoading(true);
    await login(email.current.value, password.current.value)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
        SetUser(user);
        // ...
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

  return (
    <div className="bgimg-modal">
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs" sx={{ py: 2, px: 3 }}>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ 
            m: 0.5, 
            bgcolor: "secondary.main",
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
            Sign in
          </Typography>
          <Box noValidate sx={{ mt: 0.5, width: '100%' }}>
            <TextField
              margin="dense"
              required
              fullWidth
              size="small"
              inputRef={email}
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="dense"
              required
              fullWidth
              size="small"
              inputRef={password}
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />

            <Button
              onClick={handelLogIn}
              fullWidth
              variant="contained"
              disabled = {loading}
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
              Sign In
            </Button>
            <Grid container className="mb-1" style={{cursor:"pointer"}}>
              <Grid item xs>
                <div className="link" onClick={()=>{setPas(true)}}>
                  {"Forgot password?"}
                </div>
              </Grid>
              <Grid item>
                <div className="link" onClick={()=>{setLogInAcoount(false)}}>
                  {"Don't have an account? Sign Up"}
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
