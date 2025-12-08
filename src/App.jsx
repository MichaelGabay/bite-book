import React, { createContext, useState, useEffect, useRef } from "react"
import MyRouter from "./router/MyRouter"
import { apiKayCode } from "./apiCode"
//Lord-Icon
import lottie from "lottie-web"
import "./App.css"
import { defineElement } from "lord-icon-element"
// define "lord-icon" custom element with default properties
defineElement(lottie.loadAnimation)
//
export const ContextData = createContext()

export default function App() {
  // current user
  const [user, SetUser] = useState(null)
  const [loading, SetLoading] = useState(false)
  const [run, setRun] = useState(false)
  const [logInAcoount, setLogInAcoount] = useState(true)
  const [pas, setPas] = useState(false)
  const [currentOpen, setCurrentOpen] = useState(null)
  const [previewUrl, setPreviewUrl] = useState([])
  const [deleteRecipe, setDeleteRecipe] = useState(false)
  const [imgFile, setImgFile] = useState([])
  const [apiRecpie, sutapiRecpie] = useState(null)
  const [apiRecpieRan, sutapiRecpieRan] = useState(null)
  const [apiData, setapiData] = useState(null)
  const [aiRecipe, setAiRecipe] = useState(null)
  const [ProPaypal, setProPaypal] = useState(null)
  const [recipeNum, setRecipeNum] = useState(null)
  const [premium, setPremium] = useState(null)
  const [userRecipe, setUserRecipe] = useState(null)
  const componentRef = useRef()

  // Verify environment variables are loaded on app start
  useEffect(() => {
    // Log environment variables (only in development)
    if (process.env.NODE_ENV === "development") {
      console.log("Environment variables loaded:")
      console.log(
        "REACT_APP_GEMINI_API_KEY:",
        process.env.REACT_APP_GEMINI_API_KEY ? "✓ Loaded" : "✗ Missing"
      )
    }
  }, [])

  useEffect(() => {
    fetch(
      `https://api.spoonacular.com/recipes/random?apiKey=${
        apiKayCode[Math.floor(Math.random() * apiKayCode.length)]
      }&number=50`
    )
      .then((response) => response.json())
      .then((data) => {
        sutapiRecpieRan(data)
        console.log(data)
      })
      .catch((err) => console.error(err))
  }, [])

  const data = {
    user,
    SetUser,
    loading,
    SetLoading,
    currentOpen,
    setCurrentOpen,
    run,
    setRun,
    previewUrl,
    setPreviewUrl,
    imgFile,
    setImgFile,
    logInAcoount,
    setLogInAcoount,
    pas,
    setPas,
    apiRecpie,
    sutapiRecpie,
    apiRecpieRan,
    sutapiRecpieRan,
    apiData,
    setapiData,
    aiRecipe,
    setAiRecipe,
    ProPaypal,
    setProPaypal,
    recipeNum,
    setRecipeNum,
    premium,
    setPremium,
    deleteRecipe,
    setDeleteRecipe,
    userRecipe,
    setUserRecipe,
    componentRef,
  }
  return (
    <>
      <ContextData.Provider value={data}>
        <MyRouter />
      </ContextData.Provider>
    </>
  )
}
