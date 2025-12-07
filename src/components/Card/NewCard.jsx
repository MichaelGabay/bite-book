import React, { useContext } from "react";
import {useNavigate } from "react-router-dom";
import { TiPlus } from "react-icons/ti";
import { ContextData } from "../../App";

export default function NewCard() {
  const { setImgFile, setPreviewUrl } = useContext(ContextData);

  const navigate = useNavigate();

  function newRec() {
    setImgFile([]);
    setPreviewUrl([]);

    navigate("/newrecipe");
  }

  return (
    <>
      <div style={{cursor:"pointer"}}
        onClick={() => {
          newRec();
        }}
      >
        <div className="card text-dark NewCardHover mb-2 bg-bg">
          <div className="card-img-overlay p-0">
            <h4 className="d-flex justify-content-center align-items-center">
              הוסף מתכון
            </h4>
            <div className="d-flex justify-content-center align-items-center">
              {" "}
              <TiPlus size={30} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
