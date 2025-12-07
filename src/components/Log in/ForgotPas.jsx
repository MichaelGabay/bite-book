import React, { useState } from 'react'
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useContext } from 'react';
import { ContextData } from '../../App';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../../Firebase';
import "./Login.css"

const theme = createTheme();

export default function ForgotPas() {
  const { loading, SetLoading } = useContext(ContextData);
  const[email , setEmail] = useState("");

function reset(){
  SetLoading(true)
  sendPasswordResetEmail(auth, email)
  .then(() => {
    // Password reset email sent!
    // ..
    alert("secsed");
    SetLoading(false)

  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    alert(errorCode);
    alert(errorMessage);
    SetLoading(false)
  });
}





  return (
    <>
    <div className="bgimg">
     <ThemeProvider theme={theme} >
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 3,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
          Forgot password
          </Typography>
          <Box noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={(e)=>{setEmail(e.target.value)}}
            />
            <Button
              onClick={()=>{reset()}}
              fullWidth
              variant="contained"
              disabled = {loading}
              sx={{ mt: 2, mb: 4 }}
            >
              Send
            </Button>
          </Box>
        </Box>

      </Container>
    </ThemeProvider>
    </div>
    </>
  )
}