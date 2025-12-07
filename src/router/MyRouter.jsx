import React from "react";
import { Route, Routes } from "react-router-dom";
import AboutUs from "../components/AboutUs/AboutUs";
import Card from "../components/Card/CardView";
import NewCard from "../components/Card/NewCard";
import HomePage from "../components/HomePage/HomePage";
import LoginPas from "../components/Log in/LoginPas";
import SignUp from "../components/Log in/SignUp";
import RecipeView from "../components/MainPage/RecipeView";
import Nav from "../components/nav/Nav";
import NewRecipe from "../components/newRecipe/NewRecipe";
import PageError from "../components/pageError/PageError";
import InputFile from "../inputFile/InputFile";
import RecipeList from "../components/MainPage/RecipeList";
import Burger from "../components/nav/Burger";
import Main from "../components/MainPage/Main";
import Plus from "../components/MainPage/Plus";
import RecipeUp from "../components/newRecipe/RecipeUp";
import Pro from "../components/Pro/Pro";
import CreditCard from "../components/Pro/CreditCard";
import ForgotPas from "../components/Log in/ForgotPas";
import ApiCard from "../components/Api recipes/ApiCard";
import ApiMain from "../components/Api recipes/ApiMain";
import ApiView from "../components/Api recipes/ApiView";
import ApiPlus from "../components/Api recipes/ApiPlus";
import UpdateUser from "../components/nav/UpdateUser";

export default function MyRouter() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/main" element={<Main />} />
        <Route path="/nav" element={<Nav />} />
        <Route path="/card" element={<Card />} />
        <Route path="/newcard" element={<NewCard />} />
        <Route path="/newrecipe" element={<NewRecipe />} />
        <Route path="/inputfile" element={<InputFile />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<LoginPas />} />
        <Route path="/recipeList" element={<RecipeList />} />
        <Route path="/plus" element={<Plus />} />
        <Route path="/recipeView" element={<RecipeView />} />
        <Route path="/main/pro" element={<Pro />} />
        <Route path="/main/pro/creditcard" element={<CreditCard />} />
        <Route path="/burger" element={<Burger />} />
        <Route path="/pas" element={<ForgotPas />} />
        <Route path="/recipeUp" element={<RecipeUp />} />
        <Route path="/apiCard" element={<ApiCard />} />
        <Route path="/main/apiMain" element={<ApiMain />} />
        <Route path="/aplus" element={<ApiPlus />} />
        <Route path="/Main/UpdateUser" element={<UpdateUser />} />
        <Route path="/apiView" element={<ApiView />} />
        <Route path="/*" element={<PageError />} />
      </Routes>
    </div>
  );
}
