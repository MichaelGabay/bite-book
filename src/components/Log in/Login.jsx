import * as React from "react";
import Button from "@mui/joy/Button";
import Card from "@mui/joy/Card";
import { FcGoogle } from "react-icons/fc";
import { FaGhost } from "react-icons/fa";
import { RiLoginCircleFill } from "react-icons/ri";
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../../Firebase";
import { useContext } from "react";
import Dialog from '@mui/material/Dialog';
import LoginPas from "./LoginPas";
import ForgetPas from "./ForgotPas";
import "./Login.css";

import { useState } from "react";
import { ContextData } from "../../App";
import SignUp from "./SignUp";
import { useNavigate } from "react-router-dom";


export default function Login() {
  const [open, setOpen] = useState(false);
  const { SetUser, logInAcoount, pas, setPas } = useContext(ContextData);
  const navigate = useNavigate();


  const signInWithGoogle = () => {
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        // console.log(result);
        SetUser(result);
      })
      .catch((erorr) => {
        // console.log(erorr);
        alert("error");
      });
  };
  const handleClickOpen = () => {
    setOpen(true);
    setPas(false)
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="d-flex justify-content-center mt-5">
      <Card
        className="card-container"
        sx={{ 
          width: 320,
          padding: 3,
          borderRadius: 3,
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
          background: 'linear-gradient(135deg, #ffffff 0%, #f5f5f5 100%)',
          transition: 'all 0.3s ease'
        }}
      >
        <h3 style={{ 
          textAlign: 'center', 
          marginBottom: '1.5rem',
          color: '#1976d2',
          fontWeight: 600
        }}>
          Welcome!
        </h3>

        <Button 
          className="btn shadow-sm mb-3" 
          onClick={handleClickOpen}
          sx={{
            width: '100%',
            fontSize: '1rem',
            fontWeight: 500,
            padding: '12px',
            borderRadius: 2,
            transition: 'all 0.3s ease',
            '&:hover': {
              transform: 'translateY(-2px)',
              boxShadow: '0 6px 20px rgba(25, 118, 210, 0.3)'
            }
          }}
        >
          התחבר
          <RiLoginCircleFill style={{ marginRight: '8px' }} />
        </Button>
        <Dialog 
          open={open} 
          onClose={handleClose}
          maxWidth="sm"
          PaperProps={{
            sx: {
              borderRadius: 3,
              maxWidth: '400px',
              width: '100%',
              maxHeight: '90vh',
              overflow: 'auto'
            }
          }}
        >
          {pas ? <ForgetPas className="" />
            : logInAcoount ? <LoginPas /> : <SignUp />}
        </Dialog>

        <Button 
          onClick={signInWithGoogle} 
          className="btn shadow-sm mb-3"
          sx={{
            width: '100%',
            fontSize: '1rem',
            fontWeight: 500,
            padding: '12px',
            borderRadius: 2,
            transition: 'all 0.3s ease',
            '&:hover': {
              transform: 'translateY(-2px)',
              boxShadow: '0 6px 20px rgba(0, 0, 0, 0.15)'
            }
          }}
        >
          <h6 style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
            Google התחבר עם
            <FcGoogle style={{ fontSize: '1.2rem' }} />
          </h6>
        </Button>
        <Button 
          className="btn shadow-sm mb-3" 
          onClick={() => { navigate("/main") }}
          sx={{
            width: '100%',
            fontSize: '1rem',
            fontWeight: 500,
            padding: '12px',
            borderRadius: 2,
            transition: 'all 0.3s ease',
            '&:hover': {
              transform: 'translateY(-2px)',
              boxShadow: '0 6px 20px rgba(0, 0, 0, 0.15)'
            }
          }}
        >
          <h6 style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
            התחבר כאורח
            <FaGhost style={{ fontSize: '1.2rem' }} />
          </h6>
        </Button>
        <p 
          level="body2" 
          className="d-flex justify-content-end" 
          style={{ 
            color: "#666",
            fontSize: '0.9rem',
            marginTop: '1rem',
            marginBottom: 0
          }}
        >
          .התחבר/הרשם בשביל להמשיך
        </p>
      </Card>
    </div>
  );
}
