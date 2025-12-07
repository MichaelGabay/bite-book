import React from "react";
import { useContext } from "react";
import { IoMdReturnRight } from "react-icons/io";
import { Link } from "react-router-dom";
import { ContextData } from "../../App";
import ApiPlus from "./ApiPlus";
import "./ApiView.css"
export default function ApiView() {
  const { apiRecpie, sutapiRecpie } = useContext(ContextData);
  console.log(apiRecpie.instructions);
  console.log(apiRecpie);

  return (
    <>
      <div className="bgImg">
        <Link to={"/main/apiMain"}>
          <div className="btn back-button">
            <div>
              <IoMdReturnRight size={30} />
            </div>
          </div>
        </Link>
        {/* <img height={40} width={40} src={apiRecpie.spoonacularSourceUrl} alt="" /> */}
      <div className="my-2 d-flex container mt-5">
        <div className="RecipeViewContiner shadow col-12 ">
          <h2 className="d-flex justify-content-center">{apiRecpie.title}</h2>
          <div className="row">
            <div className="imgApi col-12 col-md-6">
                <img
                  className="imgApi col-12"
                  src={apiRecpie.image? apiRecpie.image : "https://i.imagesup.co/images2/eb71cc96839f80c8a1e3f35783f6b28984ca90d2.png"}
                  alt="logo"
                />
            </div>
            <div className="col-12 col-md-6 ">
              <h3 className="col-12 d-flex justify-content-center">מרכיבים</h3>
              {apiRecpie != null
          ? apiRecpie.extendedIngredients.map((item, i) => (
                <div
                  dir="rtl"
                  className="d-flex col-12 justify-content-start ing_style"
                  key={i}
                >
                  • {item.original}
                </div>
              )):""}
            </div>
          </div>
          <h2 className=" d-flex justify-content-center justify-content-start ">
            אופן הכנה
          </h2>
          <p className="ing_style"> {apiRecpie.instructions}</p>
        </div>
        <div className="apiPlus">
           <ApiPlus/>
          </div>
      </div>
      </div>

    </>
  );
}
