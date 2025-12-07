import React, { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Login from "../Log in/Login";
import "./HomePage.css";
import { useAuth } from "../../Firebase";
import { ContextData } from "../../App";

export default function HomePage() {
  const { SetUser } = useContext(ContextData);

  const currentUser = useAuth();
  useEffect(() => {
    console.log(currentUser);
    if (currentUser) SetUser(currentUser);
  }, [currentUser]);

  const navigate = useNavigate();
  return (
    <>
      {currentUser == null ? (
        <div className="bgImg row">

          <div className="col-0 col-lg-5">

          </div>
          <div className="col-12 col-lg-7">
            <h3 className="myFont myFontHomePage">biteBook</h3>
            <h4 className="myFont myFontHomePage2">מתכונים שאוהבים לאכול</h4>
            <Login />
          </div>


        </div>
      ) : (
        navigate("/main")
      )}
    </>
  );
}
