import React, { useContext, useEffect } from "react";
import Nav from "../nav/Nav";
import RecipeList from "./RecipeList";
import RecipeView from "./RecipeView";
import "./Main.css"
import { ContextData } from "../../App";

export default function Main() {
  const { setCurrentOpen } = useContext(ContextData);
  

  useEffect(() => {
    window.scroll({
      top: 0, 
      left: 0, 
      behavior: 'smooth'
    });
  }, [setCurrentOpen])
  
  return (
    <>
    <div className="bgImg" >
      <Nav />
      <div className="d-lg-flex flex-row">
        <div className="col-lg-8 col-12 ">
          <RecipeView />
        </div>
        <div className="col-lg-4 col-12 pl-lg-0 mb-2">
          <RecipeList /> 
        </div>
      </div>
    </div>
   </>
  );
}
