import React, { useContext, useEffect } from "react"
import { IoMdReturnRight } from "react-icons/io"
import { Link, useNavigate } from "react-router-dom"
import { ContextData } from "../../App"
import AIRecipePlus from "./AIRecipePlus"
import { useAuth } from "../../Firebase"
import "./AIRecipeView.css"

export default function AIRecipeView() {
  const { aiRecipe, user, SetUser } = useContext(ContextData)
  const currentUser = useAuth()
  const navigate = useNavigate()

  // Check authentication and redirect if not logged in
  useEffect(() => {
    if (currentUser) {
      SetUser(currentUser)
    } else if (currentUser === null && user === null) {
      // User is not logged in, redirect to login
      alert("אנא התחבר כדי לצפות במתכונים")
      navigate("/login")
    }
  }, [currentUser, user, SetUser, navigate])

  // Show login message if user is not authenticated
  if (!user && currentUser === null) {
    return (
      <div className="bgImg">
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ minHeight: "80vh" }}
        >
          <div className="alert alert-warning" role="alert">
            <h4>נדרש התחברות</h4>
            <p>אנא התחבר כדי לצפות במתכונים</p>
            <Link to="/login" className="btn btn-primary mt-2">
              התחבר עכשיו
            </Link>
          </div>
        </div>
      </div>
    )
  }

  if (!aiRecipe) {
    return (
      <div className="bgImg">
        <Link to={"/main/aiGenerate"}>
          <div className="btn back-button-ipa">
            <div>
              <IoMdReturnRight size={30} />
            </div>
          </div>
        </Link>
        <div className="d-flex justify-content-center align-items-center mt-5">
          <div className="alert alert-info">
            לא נמצא מתכון. אנא צור מתכון חדש.
          </div>
        </div>
      </div>
    )
  }

  return (
    <>
      <div className="bgImg">
        <Link to={"/main/aiGenerate"}>
          <div className="btn back-button-ipa">
            <div>
              <IoMdReturnRight size={30} />
            </div>
          </div>
        </Link>
        <div className="my-2 d-flex container mt-5">
          <div className="RecipeViewContiner shadow col-12">
            <h2 className="d-flex justify-content-center">{aiRecipe.name}</h2>
            <div className="row">
              <div className="col-12">
                <h3 className="col-12 d-flex justify-content-center">
                  מרכיבים
                </h3>
                {aiRecipe.ingredients && aiRecipe.ingredients.length > 0 ? (
                  aiRecipe.ingredients.map((item, i) => (
                    <div
                      dir="rtl"
                      className="d-flex col-12 justify-content-start ing_style"
                      key={i}
                    >
                      • {item}
                    </div>
                  ))
                ) : (
                  <p className="ing_style">אין מרכיבים זמינים</p>
                )}
              </div>
            </div>
            <h2 className="d-flex justify-content-center justify-content-start mt-4">
              אופן הכנה
            </h2>
            <div className="instructions-container">
              {aiRecipe.instructions && aiRecipe.instructions.length > 0 ? (
                aiRecipe.instructions.map((item, i) => (
                  <div key={i} className="instruction-step" dir="rtl">
                    <span className="instruction-number">{i + 1}.</span>
                    <span className="instruction-text">{item}</span>
                  </div>
                ))
              ) : (
                <p className="ing_style">אין הוראות הכנה זמינות</p>
              )}
            </div>
          </div>
          <div className="apiPlus">
            <AIRecipePlus />
          </div>
        </div>
      </div>
    </>
  )
}
