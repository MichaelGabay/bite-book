import React, { useContext, useEffect, useState } from "react";
import { BiSearchAlt } from "react-icons/bi";
import { IoMdReturnRight } from "react-icons/io";
import { Link } from "react-router-dom";
import { ContextData } from "../../App";
import { apiKayCode } from "../../apiCode"
import Nav from "../nav/Nav";
import ApiCard from "./ApiCard";
import "./ApiMain.css";
export default function ApiMain() {
  
  const { apiRecpieRan, sutapiRecpieRan, apiData, setapiData } = useContext(ContextData);
  const [product, setproduct] = useState();
  console.log(apiRecpieRan);

  function Search() {

    if (product) {
     fetch(
      `https://api.spoonacular.com/recipes/complexSearch?query=${product}&apiKey=${apiKayCode[Math.floor(Math.random() * apiKayCode.length)]}&number=50`
    )
      .then((response) => response.json())
      .then((data) => { setapiData(data.results); console.log(data); })
      .catch((err) => console.error(err));
  }
  else{
    alert("🥗🍰  בבקשה תכניס שם מתכון");
  }}
  return (
    <>
      <div className="bgImg">
        <Nav />
        <Link to={"/main"}>
          <div className="btn back-button-ipa">
            <div>
              <IoMdReturnRight size={30} />
            </div>
          </div>
        </Link>
        <div className="d-flex justify-content-center mt-5">
          <div className="input-group col-8 col-sm-6">
            <button
              className="btn btntStyle"
              type="button"
              id="button-addon2"
              onClick={() => Search()}
            >
              <BiSearchAlt size={20} />
            </button>
            <input
              onChange={(e) => setproduct(e.target.value)}
              dir="rtl"
              type="search"
              className="form-control inputStyle"
              placeholder="הכנס שם מתכון"
              aria-label="Recipient's username"
              aria-describedby="button-addon2"
            />
          </div>
        </div>
        <div className="mt-5 row justify-content-center">
          {apiData != null ? apiData.map((item, i) => (
            <div className=" mb-3" key={i}>
              {item.image ?
                <ApiCard key={i} item={item} />
                 : ""}
            </div>
          )) :
            apiRecpieRan.recipes.map((item, i) => (
              <div className="mr-2 mb-3" key={i}>
                {item.image ?
                  <ApiCard key={i} item={item} />
                   : ""}
              </div>
            ))
          }
        </div>
      </div>
    </>
  );
}
