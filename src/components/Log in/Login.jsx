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
        // variant="outlined"
        sx={{ width: 320 }}
      // style={{ backgroundColor: "rgba(0, 0, 0,0.35)" }}
      >
        <h3>
          {/* <b style={{ color: "black" }}>Welcome!</b> */}
        </h3>

        <Button className="btn shadow-sm mb-3" onClick={handleClickOpen}>
          התחבר
          <RiLoginCircleFill />
        </Button>
        <Dialog open={open} onClose={handleClose}>
          {pas ? <ForgetPas className="" />
            : logInAcoount ? <LoginPas /> : <SignUp />}
        </Dialog>

        <Button onClick={signInWithGoogle} className="btn shadow-sm mb-3">
          <h6>
            Google התחבר עם
            <FcGoogle />
          </h6>
        </Button>
        <Button className="btn shadow-sm mb-3" onClick={() => { navigate("/main") }}>
          <h6>
            התחבר כאורח
            <FaGhost />
          </h6>
        </Button>
        <p level="body2" className="d-flex justify-content-end" style={{ color: "black" }}>
          .התחבר/הרשם בשביל להמשיך
        </p>
      </Card>
    </div>
  );
}
