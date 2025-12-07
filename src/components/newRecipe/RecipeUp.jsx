import React, { useContext, useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import "./NewRecipe.css";
import RecipeData from "../../Classes/ClassNewRecipe";
import InputFile from "../../inputFile/InputFile";
import Dialog from "@mui/material/Dialog";
import { db, storage } from "../../Firebase";
import { doc, updateDoc } from "firebase/firestore";
import { Link, useNavigate } from "react-router-dom";
import { ContextData } from "../../App";
import { IoMdReturnRight } from "react-icons/io";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import rtlPlugin from "stylis-plugin-rtl";
import { prefixer } from "stylis";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import { ref, uploadBytes } from "firebase/storage";
import { Carousel } from "react-responsive-carousel";

export default function RecipeUp() {
  const navigate = useNavigate();
  const { currentOpen,previewUrl, setCurrentOpen ,imgFile } = useContext(ContextData);
  const [open, setOpen] = useState(false);

  const [nameRecipe, setNameRecipe] = useState(currentOpen.name);
  const [ingredients, setIngredients] = useState(
    currentOpen.ingredients.toString().replaceAll(",", "\n")
  );
  const [instructions, setInstructions] = useState(
    currentOpen.instructions.toString().replaceAll(",", "\n")
  );

  async function setUp() {
    let newRecipeData = await new RecipeData(
      nameRecipe,
      ingredients.split("\n"),
      instructions.split("\n"),
      currentOpen.id
    );
    newRecipeData.favorite = currentOpen.favorite;
    newRecipeData.docId = currentOpen.docId;

    for (let index = 0; index < imgFile.length; index++) {
      console.log(imgFile);
      const imageRef = ref(storage,`${newRecipeData.docId}/${imgFile[index].file?.name}`);
      if(imgFile[index].file){
        uploadBytes(imageRef, imgFile[index].file).then((e) => {
          console.log(e);
        });
      }
     
    }

   
    await updateDoc(doc(db, "recepis", currentOpen.docId), {
      ...newRecipeData,
    });
    setCurrentOpen(undefined);
    navigate("/main");
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const theme = createTheme({
    direction: "rtl", // Both here and <body dir="rtl">
  });
  // Create rtl cache
  const cacheRtl = createCache({
    key: "muirtl",
    stylisPlugins: [prefixer, rtlPlugin],
  });

  return (
    <div className="bgImg">
      <div dir="rtl" className="d-flex justify-content-center m-3">
        <Link to={"/main"}>
          <div className="btn back-button">
            <div>
              <IoMdReturnRight size={30} />
            </div>
          </div>
        </Link>
        <div className="newRecipeForm p-md-5  col-12 col-md-9  border flex-column d-flex justify-content-center my-5">
          <h1 className="d-flex justify-content-center myFont">עדכן מתכון</h1>
          <div className="d-flex justify-content-center">
            <CacheProvider value={cacheRtl}>
              <ThemeProvider theme={theme}>
                <Box
                  component="form"
                  className="col-11"
                  sx={{ "& .MuiTextField-root": { m: 2, width: "160ch" } }}
                  noValidate
                  autoComplete="off"
                >
                  <div>
                    <div className="d-flex justify-content-center">
                      <TextField
                        id="outlined-multiline-flexible"
                        className="bgInpot"
                        label="שם מתכון"
                        placeholder="שם מתכון"
                        color="error"
                        value={nameRecipe}
                        onChange={(e) => {
                          setNameRecipe(e.target.value);
                        }}
                      />
                    </div>
                    <div
                      className="d-flex justify-content-end row mr-3 m-1"
                      dir="ltr"
                    ><div className="col-12 nl-2 col-lg-6 ">
                      <Carousel showThumbs={false}  autoPlay={true}  transitionTime={3} infiniteLoop={true} showStatus={true}>            
              {previewUrl.map((item, i) => (
                  <img key={i} className="imgCarouselNew " src={item} alt = "hey" />
                ))}
              </Carousel>
                      </div>
                      <div
className="btn col-12 d-flex col-lg-4 justify-content-center" style={{ color: "black", cursor: "pointer", height:"100px" }}                      >
                        <div
                          className="d-flex align-items-center"
                          onClick={handleClickOpen}
                        >
                          <b> עדכן תמונה </b>
                          <lord-icon
                            src="https://cdn.lordicon.com/ynwbvguu.json"
                            trigger="hover"
                            colors="primary:#c71f16"
                            style={{ width: "60px", height: "60px" }}
                          ></lord-icon>
                        </div>{" "}
                      </div>
                      <Dialog open={open} onClose={handleClose}>
                        <InputFile />
                      </Dialog>
                    </div>
                    <div className="d-flex justify-content-center">
                      <TextField
                        id="outlined-textarea"
                        className="bgInpot"
                        label="מרכיבים"
                        placeholder="מרכיבים"
                        color="error"
                        multiline
                        value={ingredients}
                        onChange={(e) => {
                          setIngredients(e.target.value);
                        }}
                      />
                    </div>
                    <div className="d-flex justify-content-center">
                      <TextField
                        id="outlined-multiline-static"
                        label="אופן הכנה"
                        placeholder="אופן הכנה"
                        className="bgInpot"
                        multiline
                        color="error"
                        rows={5}
                        value={instructions}
                        onChange={(e) => {
                          setInstructions(e.target.value);
                        }}
                      />
                    </div>
                    <div className="d-flex justify-content-end">
                      <button
                        onClick={() => {
                          setUp();
                        }}
                        type="button"
                        className="btn btn-color m-3 d-flex"
                      >
                        <lord-icon
                          src="https://cdn.lordicon.com/wfadduyp.json"
                          trigger="hover"
                          colors="primary:#ffffff"
                          style={{ width: "25px", height: "25px" }}
                        ></lord-icon>
                        <div className="mr-1">עדכן </div>
                      </button>
                    </div>
                  </div>
                </Box>
              </ThemeProvider>
            </CacheProvider>
          </div>
        </div>
      </div>
    </div>
  );
}
