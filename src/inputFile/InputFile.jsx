import React from "react";
import "./InputFileStyle.css";
import { BiImageAdd } from "react-icons/bi";
import { useRef } from "react";
import { Carousel } from "react-responsive-carousel";
import { useContext } from "react";
import { ContextData } from "../App";
import { deleteObject, ref } from "firebase/storage";
import { storage } from "../Firebase";

export default function InputFile() {
  const { previewUrl, setPreviewUrl, imgFile, setImgFile ,currentOpen } =
    useContext(ContextData);
  const imgref = useRef();
  console.log(previewUrl);
  console.log(imgFile);

  const handleChange = (e) => {
    const file = imgref.current.files[0];
    const url = URL.createObjectURL(imgref.current.files[0]);
    setImgFile([...imgFile, { file }]);
    setPreviewUrl([...previewUrl, url]);
  };

  function dal(i) {
    if (currentOpen) {
      const desertRef = ref(storage, `${currentOpen.docId}/${imgFile[i].name}`);
      // Delete the file
      deleteObject(desertRef)
        .then((e) => {
          console.log("sucsess");
        })
        .catch((error) => {
          console.log(error);
        });
    }
    console.log(i);
    setPreviewUrl(previewUrl.filter((e) => e !== previewUrl[i]));
    setImgFile(imgFile.filter((e) => e !== imgFile[i]));
  }
  return (
    <>
      <div className="bgInpot  container-fluid   ">
        <div className="inp_continer inp_img container mt-2 mb-2">
          <input
            onChange={handleChange}
            ref={imgref}
            className="inp_hide"
            type="file"
            name=""
            id=""
          />
          <div className="inp_caver">
            <h3> !תלחץ וגרור לכאן</h3>
            <BiImageAdd size={30} />
            <b style={{ fontSize: "12px" }}>לעוד תמונה לחץ שוב* </b>
          </div>
        </div>
        <Carousel
          showThumbs={false}
          thumbWidth={40}
          autoPlay={true}
          transitionTime={3}
          infiniteLoop={true}
          showStatus={true}
          className="container mb-2 caruselStyle"
        >
          {previewUrl?previewUrl.map((item, i) => (
            <div key={i}>
              <img className="imgCarouselInput" src={item} alt = "hey" />
              <div
                onClick={() => {
                  dal(i);
                }}
                className="trash"
              >
                <lord-icon
                  src="https://cdn.lordicon.com/tntmaygd.json"
                  trigger="hover"
                  colors="primary:#000000,secondary:#c71f16"
                  stroke="100"
                  style={{ width: "40px", height: "40px" }}
                ></lord-icon>
              </div>
            </div>
          )):""}
        </Carousel>
      </div>
    </>
  );
}
