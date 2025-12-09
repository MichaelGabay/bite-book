import React, { useContext, useState, useEffect } from "react"
import { BiSearchAlt } from "react-icons/bi"
import { IoMdReturnRight } from "react-icons/io"
import { Link, useNavigate } from "react-router-dom"
import { ContextData } from "../../App"
import Nav from "../nav/Nav"
import { generateRecipeWithAI } from "../../apiGemini"
import { useAuth } from "../../Firebase"
import "./AIGenerate.css"

export default function AIGenerate() {
  const { setAiRecipe, SetLoading, user, SetUser } = useContext(ContextData)
  const currentUser = useAuth()
  const [prompt, setPrompt] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  // Check authentication and redirect if not logged in
  useEffect(() => {
    if (currentUser) {
      SetUser(currentUser)
    } else if (currentUser === null && user === null) {
      // User is not logged in, redirect to login
      alert("אנא התחבר כדי ליצור מתכונים עם AI")
      navigate("/login")
    }
  }, [currentUser, user, SetUser, navigate])

  // Show login message if user is not authenticated
  if (!user && currentUser === null) {
    return (
      <div className="bgImg">
        <Nav />
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ minHeight: "80vh" }}
        >
          <div className="alert alert-warning" role="alert">
            <h4>נדרש התחברות</h4>
            <p>אנא התחבר כדי ליצור מתכונים עם AI</p>
            <Link to="/login" className="btn btn-primary mt-2">
              התחבר עכשיו
            </Link>
          </div>
        </div>
      </div>
    )
  }

  async function handleGenerate() {
    if (!user) {
      alert("אנא התחבר כדי ליצור מתכונים")
      navigate("/login")
      return
    }

    if (!prompt.trim()) {
      alert("🥗🍰 בבקשה הכנס תיאור למתכון")
      return
    }

    setIsGenerating(true)
    setError(null)
    SetLoading(true)

    try {
      const recipe = await generateRecipeWithAI(prompt)
      setAiRecipe(recipe)
      navigate("/aiRecipeView")
    } catch (err) {
      console.error("Error generating recipe:", err)
      const errorMessage = err.message || "שגיאה ביצירת המתכון"
      setError(`${errorMessage}. אנא נסה שוב.`)
      alert(`${errorMessage}. אנא נסה שוב.`)
    } finally {
      setIsGenerating(false)
      SetLoading(false)
    }
  }

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
          <div className="ai-generate-container">
            <h2 className="ai-generate-title">צור מתכון עם AI</h2>
            <p className="ai-generate-subtitle">
              תאר את המתכון שאתה רוצה ואנחנו ניצור אותו עבורך
            </p>
            <div className="input-group col-12 col-sm-10">
              <button
                className="btn btntStyle"
                type="button"
                id="button-addon2"
                onClick={handleGenerate}
                disabled={isGenerating}
              >
                {isGenerating ? (
                  <div className="ai-button-loader"></div>
                ) : (
                  <BiSearchAlt size={20} />
                )}
              </button>
              <input
                onChange={(e) => setPrompt(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === "Enter" && !isGenerating) {
                    handleGenerate()
                  }
                }}
                value={prompt}
                dir="rtl"
                type="text"
                className="form-control inputStyle"
                placeholder="לדוגמה: פסטה איטלקית עם עגבניות ובזיליקום"
                aria-label="תיאור המתכון"
                aria-describedby="button-addon2"
                disabled={isGenerating}
              />
            </div>
            {error && (
              <div className="alert alert-danger mt-3" role="alert">
                {error}
              </div>
            )}
            {isGenerating && (
              <div className="ai-loading-container">
                <div className="ai-loader"></div>
                <p className="ai-loading-text">
                  יוצר מתכון... זה עשוי לקחת כמה שניות
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
