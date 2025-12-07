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
    <div className="bgimg-modal">
     <ThemeProvider theme={theme} >
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
          Forgot password
          </Typography>
          <Box noValidate sx={{ mt: 0.5, width: '100%' }}>
            <TextField
              margin="dense"
              required
              fullWidth
              size="small"
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