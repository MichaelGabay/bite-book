import React, { useContext, useEffect } from "react"
import Nav from "../nav/Nav"
import RecipeList from "./RecipeList"
import RecipeView from "./RecipeView"
import "./Main.css"
import { ContextData } from "../../App"

export default function Main() {
  const { setCurrentOpen } = useContext(ContextData)

  useEffect(() => {
    window.scroll({
      top: 0,
      left: 0,
      behavior: "smooth",
    })
  }, [setCurrentOpen])

  return (
    <div className="main-page-container">
      <Nav />
      <div className="main-page-content">
        <div className="main-page-grid">
          {/* Recipe View Section */}
          <div className="recipe-view-section">
            <RecipeView />
          </div>

          {/* Recipe List Section */}
          <div className="recipe-list-section">
            <RecipeList />
          </div>
        </div>
      </div>
    </div>
  )
}
