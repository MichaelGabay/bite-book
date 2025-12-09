import React, { useContext, useState, useEffect, useRef } from "react"
import { BiSearchAlt } from "react-icons/bi"
import { IoMdReturnRight } from "react-icons/io"
import { Link, useNavigate } from "react-router-dom"
import { ContextData } from "../../App"
import Nav from "../nav/Nav"
import { generateRecipeFromIngredients } from "../../apiGemini"
import { useAuth } from "../../Firebase"
import "./AIGenerateFromIngredients.css"

export default function AIGenerateFromIngredients() {
  const { setAiRecipe, SetLoading, user, SetUser } = useContext(ContextData)
  const currentUser = useAuth()
  const [ingredients, setIngredients] = useState([""])
  const [isGenerating, setIsGenerating] = useState(false)
  const [error, setError] = useState(null)
  const navigate = useNavigate()
  const inputRefs = useRef([])

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

  const handleIngredientChange = (index, value) => {
    const newIngredients = [...ingredients]
    newIngredients[index] = value
    setIngredients(newIngredients)
  }

  const addIngredient = () => {
    setIngredients([...ingredients, ""])
    // Focus the new input after adding
    setTimeout(() => {
      const nextIndex = ingredients.length
      if (inputRefs.current[nextIndex]) {
        inputRefs.current[nextIndex].focus()
      }
    }, 0)
  }

  const removeIngredient = (index) => {
    if (ingredients.length > 1) {
      const newIngredients = ingredients.filter((_, i) => i !== index)
      setIngredients(newIngredients)
    }
  }

  async function handleGenerate() {
    if (!user) {
      alert("אנא התחבר כדי ליצור מתכונים")
      navigate("/login")
      return
    }

    // Filter out empty ingredients
    const validIngredients = ingredients.filter((ing) => ing.trim() !== "")

    if (validIngredients.length === 0) {
      alert("🥗🍰 בבקשה הכנס לפחות מרכיב אחד")
      return
    }

    setIsGenerating(true)
    setError(null)
    SetLoading(true)

    try {
      const recipe = await generateRecipeFromIngredients(validIngredients)
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
            <h2 className="ai-generate-title">צור מתכון מהמרכיבים שלך</h2>
            <p className="ai-generate-subtitle">
              הכנס את המרכיבים שיש לך ואנחנו ניצור מתכון עבורך
            </p>
            <div className="ingredients-input-container">
              {ingredients.map((ingredient, index) => (
                <div key={index} className="ingredient-input-group">
                  <input
                    ref={(el) => (inputRefs.current[index] = el)}
                    onChange={(e) =>
                      handleIngredientChange(index, e.target.value)
                    }
                    onKeyPress={(e) => {
                      if (e.key === "Enter" && !isGenerating) {
                        e.preventDefault()
                        if (index === ingredients.length - 1) {
                          // If this is the last input and has content, add new input and focus it
                          if (ingredient.trim() !== "") {
                            addIngredient()
                          }
                        } else {
                          // Focus next input
                          if (inputRefs.current[index + 1]) {
                            inputRefs.current[index + 1].focus()
                          }
                        }
                      }
                    }}
                    onKeyDown={(e) => {
                      // Handle backspace on empty input to remove it
                      if (
                        e.key === "Backspace" &&
                        ingredient === "" &&
                        index > 0 &&
                        ingredients.length > 1
                      ) {
                        e.preventDefault()
                        removeIngredient(index)
                        // Focus previous input
                        setTimeout(() => {
                          if (inputRefs.current[index - 1]) {
                            inputRefs.current[index - 1].focus()
                          }
                        }, 0)
                      }
                    }}
                    value={ingredient}
                    dir="rtl"
                    type="text"
                    className="form-control ingredient-input"
                    placeholder={`מרכיב ${index + 1}`}
                    aria-label={`מרכיב ${index + 1}`}
                    disabled={isGenerating}
                  />
                  {ingredients.length > 1 && (
                    <button
                      type="button"
                      className="btn btn-remove-ingredient"
                      onClick={() => {
                        removeIngredient(index)
                        // Focus previous input if available
                        setTimeout(() => {
                          const prevIndex = index > 0 ? index - 1 : 0
                          if (inputRefs.current[prevIndex]) {
                            inputRefs.current[prevIndex].focus()
                          }
                        }, 0)
                      }}
                      disabled={isGenerating}
                      aria-label="הסר מרכיב"
                    >
                      ×
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                className="btn btn-add-ingredient"
                onClick={addIngredient}
                disabled={isGenerating}
              >
                + הוסף מרכיב
              </button>
            </div>
            <div className="generate-button-container">
              <button
                className="btn btn-generate-recipe"
                type="button"
                onClick={handleGenerate}
                disabled={isGenerating}
              >
                {isGenerating ? (
                  <>
                    <div className="ai-button-loader"></div>
                    <span className="btn-text">יוצר מתכון...</span>
                  </>
                ) : (
                  <>
                    <BiSearchAlt size={20} />
                    <span className="btn-text">צור מתכון</span>
                  </>
                )}
              </button>
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
