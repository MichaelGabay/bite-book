import React, { useContext, useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { IoMdReturnRight } from "react-icons/io";
import "./UpdateUser.css";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { createTheme } from "@mui/system";
import createCache from "@emotion/cache";
import rtlPlugin from "stylis-plugin-rtl";
import { prefixer } from "stylis";
import { CacheProvider } from "@emotion/react";
import { ContextData } from "../../App";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import { updateProfile } from "firebase/auth";
import { UserRecipes, storage } from "../../Firebase";
import {
  deleteObject,
  getDownloadURL,
  listAll,
  ref,
  uploadBytes,
} from "firebase/storage";
export default function UpdateUser() {
  const { user ,setUserRecipe ,userRecipe } = useContext(ContextData);

  const [img, setImg] = useState(user?.photoURL);
  const [name, setName] = useState(user?.displayName);
  const [editName, setEditName] = useState(false);

  const imgRef = useRef();

  useEffect(() => {
    if (user != null) {
      const imagesListRef = ref(storage, `${user.uid}`);
      listAll(imagesListRef).then((response) => {
        response.items.forEach((item) => {
          getDownloadURL(item).then((url) => {
            setImg(url);
          });
        });
      });
    }
  }, [user]);

  function dal() {
    const desertRef = ref(storage, `${user.uid}/profilImg`);
    // Delete the file
    deleteObject(desertRef)
      .then((e) => {
        console.log("sucsess");
      })
      .catch((error) => {
        console.log(error);
      });
    setImg(user.photoURL);
  }

  function handleChange() {
    const url = URL.createObjectURL(imgRef.current.files[0]);
    setImg(url);
    const imageRef = ref(storage, `${user.uid}/profilImg`);
    uploadBytes(imageRef, imgRef.current.files[0]).then((e) => {
      console.log(e);
    });
  }

  createTheme({
    direction: "rtl", // Both here and <body dir="rtl">
  });
  // Create rtl cache 
  const cacheRtl = createCache({
    key: "muirtl",
    stylisPlugins: [prefixer, rtlPlugin],
  });

  function setname() {
    updateProfile(user, { displayName: name });
    setEditName(false);
  }

  if (user !== undefined) {
    UserRecipes(user?.uid, setUserRecipe)
    }



  return (
    <>
     <CacheProvider value={cacheRtl}>
      <div className="bgImg">
        <Link to={"/main"}>
          <div className="btn back-button">
            <div>
              <IoMdReturnRight size={30} />
            </div>
          </div>
        </Link>
        <div className="row justify-content-center ">
          <div className="UpdteUserContiner p-md-5 col-10 col-md-8 flex-column justify-content-center mt-5">
            <div className="col-12">
              <h1 className="d-flex justify-content-center  myFont">
                פרטי משתמש
              </h1>
              <div className="row justify-content-center" title="ערוך תמונה">
                <div className="Avatar mt-3" style={{ backgroundImage: `url(${img})` }}>
                  <div className="d-flex justify-content-end">
                    <input className="hide" ref={imgRef} onChange={handleChange} type="file"/>
                  </div>
                  <div className="d-flex justify-content-start">
                    <lord-icon
                      src="https://cdn.lordicon.com/vixtkkbk.json"
                      trigger="hover"
                      stroke="70"
                      colors="primary:#000000,secondary:#c71f16"
                      style={{
                        width: "40px",
                        height: "40px",
                        border: "2px solid rgba(0, 0, 0, 0.3)",
                        borderRadius: "50%",
                      }}
                    ></lord-icon>
                  </div>
                </div>
              </div>
              <div
                className="d-flex justify-content-end col-9 col-sm-7 ml-4">
                <span onClick={() => dal()}>
                  <span
                    title="מחק תמונה"
                  >
                    <lord-icon
                      src="https://cdn.lordicon.com/tntmaygd.json"
                      trigger="hover"
                      colors="primary:#000000,secondary:#c71f16"
                      stroke="100"
                      style={{ width: "27px", height: "27px", cursor: "pointer" }}
                    ></lord-icon>
                  </span>
                </span>
              </div>
              <div className="d-flex justify-content-center mt-2 mr-4">
                <div className="pen  mr-1" onClick={() => (setEditName(!editName))}>
                  <div
                    title="ערוך שם"
                  >
                    <lord-icon
                      src="https://cdn.lordicon.com/wloilxuq.json"
                      trigger="hover"
                      style={{ width: "25px", height: "25px" }}
                    >
                    </lord-icon>
                  </div>
                </div>
                <div>{name}</div>
              </div>
                {editName ? <div>
                  <Box
                    component="form"
                    className="col-12 "
                    sx={{ "& .MuiTextField-root": { m: 2, width: "160ch" } }}
                    noValidate
                    autoComplete="off"
                  >
                    <div dir="rtl">
                      <div className="row justify-content-center mt-1 align-items-center">
                        <div className="col-8 col-sm-6 pl-0 pr-0 d-flex justify-content-center">
                          <TextField
                            id="outlined-multiline-flexible"
                            className=""
                            label="שם"
                            color="error"
                            value={name}
                            onChange={(e) => { setName(e.target.value) }}
                          />
                        </div>
                        <div onClick={() => setname()} className="btn d-flex btn-color-lord " >
                          <div className="mr-1"> שמור </div>
                        </div>
                      </div>
                    </div>

                  </Box>
                </div> : ""}
                <div className="d-flex justify-content-center mb-3">
                  <b>{user.email}</b>
                </div>
            </div>
            <div className="d-flex justify-content-center mb-3">
              <div className="col-8 col-sm-5 listMenu ">
                <List>
                  <div>
                    <ListItem className="d-flex justify-content-center">
                      <ListItemText
                        primary="מתכונים"
                        secondary={userRecipe?.length}
                        className="mr-3"
                      />
                      <Avatar className="ml-4">
                        <lord-icon
                          src="https://cdn.lordicon.com/wxnxiano.json"
                          trigger="morph"
                          style={{ width: "250px", height: "250px" }}
                        ></lord-icon>
                      </Avatar>
                    </ListItem>
                  </div>
                  <div>
                    <ListItem className="d-flex justify-content-center">
                      <ListItemText
                        primary="אהובים"
                        secondary={
                          userRecipe?.filter((recipe) => recipe.favorite).length
                        }
                        className="mr-3"
                      />
                      <Avatar className="ml-4">
                        <lord-icon
                          src="https://cdn.lordicon.com/pnhskdva.json"
                          trigger="hover"
                          colors="primary:#c71f16"
                          style={{ width: "250px", height: "250px" }}
                        ></lord-icon>
                      </Avatar>
                    </ListItem>
                  </div>
                </List>
              </div>
            </div>
          </div>
        </div>

      </div>           
       </CacheProvider>

    </>
  );
}
