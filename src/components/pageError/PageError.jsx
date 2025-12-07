import React from "react";
import { Link } from "react-router-dom";
export default function PageError() {
  return (
    <>
    
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <img
            width={400}
            src="https://i.imagesup.co/images2/4f5b1c2bc2877676d89986a8681d0fa343fddf81.jpg"
            alt="404 Error"
          />
          <h1>404 Page Not Found</h1>
          <p>Sorry, the page you are looking for does not exist.</p>
          <Link to={"/"}>Go Home 🏠</Link>
        </div>
      </div>
    </>
  );
}
