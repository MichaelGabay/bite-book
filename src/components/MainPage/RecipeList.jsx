import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { ContextData } from "../../App";
import { useAuth } from "../../Firebase";
import Card from "../Card/CardView";
import NewCard from "../Card/NewCard";
import "./RecipeList.css";
import { UserRecipes } from "../../Firebase";

export default function RecipeList() {
  const {
    SetUser,
    user,
    deleteRecipe,
    setDeleteRecipe,
    userRecipe,
    setUserRecipe,
    setRecipeNum,
  } = useContext(ContextData);

  const [chekRecipeNum, setchekRecipeNum] = useState(0);

  const [filter, setfilter] = useState(null);

  const currentUser = useAuth();

  const [favCol, setFavoCol] = useState(false);

  useEffect(() => {
    if (currentUser) SetUser(currentUser);
  }, [currentUser]);

  useEffect(() => {
    UserRecipes(user?.uid, setUserRecipe);
  }, [favCol]);

  if (deleteRecipe) {
    UserRecipes(user?.uid, setUserRecipe);
    setDeleteRecipe(false);
  }

  if (user !== undefined && userRecipe === null) {
    UserRecipes(user?.uid, setUserRecipe);
  }

  useEffect(() => {
    if (user !== undefined && userRecipe !== null) {
      setchekRecipeNum(userRecipe.length);
      setRecipeNum(userRecipe);
    }
  }, [userRecipe]);

  if (user !== undefined) {
    if (userRecipe?.length > chekRecipeNum) {
      UserRecipes(user?.uid, setUserRecipe);
    }
  }

  async function favorite() {
    if (user !== undefined) {
      await UserRecipes(user?.uid, setUserRecipe);
      setFavoCol(!favCol);
    }
  }

  return (
    <>
      <div className="col-12 mt-2 px-0 ">
        <div className="overrecipe col-12 pb-2">
          <div className="d-flex">
            <form className="search-bar pt-2 pb-2 pr-0 pl-3">
              <input
                className="inputStyle"
                type="search"
                placeholder="  שם מתכון:"
                // pattern=".*\S.*"
                required
                dir="rtl"
                onChange={(e) => setfilter(e.target.value)}
              />
              <div className="search-btn "></div>
            </form>
            <div
              className="d-flex align-items-center actheart"
              onClick={favorite}
            >
              <lord-icon
                src="https://cdn.lordicon.com/hqrgkqvs.json"
                trigger="hover"
                colors={
                  favCol
                    ? "primary:#e83a30,secondary:#000000"
                    : "primary:#242424,secondary:#fad3d1"
                }
                style={{ width: "60px", height: "60px", cursor: "pointer" }}
              ></lord-icon>
            </div>
          </div>
          <div className="d-flex justify-content-center">
            <div className="col-12 col-sm-8 col-lg-12">
              <NewCard />
              {userRecipe == null ? (
                ""
              ) : favCol ? (
                userRecipe
                  .filter((recipe) => recipe.favorite)
                  .map((item, i) => (
                    <div key={i}>
                      <Card item={item} />
                    </div>
                  ))
              ) : filter == null && userRecipe?.length == chekRecipeNum ? (
                userRecipe.map((item, i) => (
                  <div key={i}>
                    <Card item={item} />
                  </div>
                ))
              ) : userRecipe.filter((recipe) => recipe.name.includes(filter))
                  .length > 0 && userRecipe?.length == chekRecipeNum ? (
                userRecipe
                  .filter((recipe) => recipe.name.includes(filter))
                  .map((item, i) => (
                    <div key={i}>
                      <Card item={item} />
                    </div>
                  ))
              ) : (
                <div className="d-flex justify-content-end mr-5 mt-3">
                  <div className="h3 mr-2 d-flex align-items-center">
                    <b>המתכון לא נמצא </b>
                  </div>
                  <lord-icon
                    src="https://cdn.lordicon.com/dnmvmpfk.json"
                    trigger="hover"
                    colors="primary:#e83a30"
                    style={{ width: "35px", height: "35px" }}
                  ></lord-icon>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
