import React, { useState, useEffect, useContext } from "react"
import { ContextData } from "../../App"
import { useAuth } from "../../Firebase"
import Card from "../Card/CardView"
import NewCard from "../Card/NewCard"
import "./RecipeList.css"
import { UserRecipes } from "../../Firebase"
import { FaSearch, FaHeart, FaRegHeart } from "react-icons/fa"
import { GiCook } from "react-icons/gi"

export default function RecipeList() {
  const {
    SetUser,
    user,
    deleteRecipe,
    setDeleteRecipe,
    userRecipe,
    setUserRecipe,
    setRecipeNum,
  } = useContext(ContextData)

  const [chekRecipeNum, setchekRecipeNum] = useState(0)
  const [filter, setFilter] = useState("")
  const [favCol, setFavoCol] = useState(false)
  const [isSearchFocused, setIsSearchFocused] = useState(false)

  const currentUser = useAuth()

  useEffect(() => {
    if (currentUser) SetUser(currentUser)
  }, [currentUser, SetUser])

  useEffect(() => {
    UserRecipes(user?.uid, setUserRecipe)
  }, [favCol, user?.uid, setUserRecipe])

  if (deleteRecipe) {
    UserRecipes(user?.uid, setUserRecipe)
    setDeleteRecipe(false)
  }

  if (user !== undefined && userRecipe === null) {
    UserRecipes(user?.uid, setUserRecipe)
  }

  useEffect(() => {
    if (user !== undefined && userRecipe !== null) {
      setchekRecipeNum(userRecipe.length)
      setRecipeNum(userRecipe)
    }
  }, [userRecipe, user, setRecipeNum])

  if (user !== undefined) {
    if (userRecipe?.length > chekRecipeNum) {
      UserRecipes(user?.uid, setUserRecipe)
    }
  }

  async function toggleFavorite() {
    if (user !== undefined) {
      await UserRecipes(user?.uid, setUserRecipe)
      setFavoCol(!favCol)
    }
  }

  const filteredRecipes = userRecipe
    ? favCol
      ? userRecipe.filter((recipe) => recipe.favorite)
      : filter
      ? userRecipe.filter((recipe) =>
          recipe.name.toLowerCase().includes(filter.toLowerCase())
        )
      : userRecipe
    : []

  const hasRecipes = filteredRecipes.length > 0
  const isLoading = userRecipe === null

  return (
    <div className="recipe-list-container">
      <div className="recipe-list-card">
        {/* Search and Filter Header */}
        <div className="recipe-list-header">
          <div className="search-container">
            <div
              className={`search-wrapper ${isSearchFocused ? "search-focused" : ""}`}
            >
              <FaSearch className="search-icon" />
              <input
                className="search-input"
                type="text"
                placeholder="חפש מתכון..."
                dir="rtl"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
              />
              {filter && (
                <button
                  className="search-clear"
                  onClick={() => setFilter("")}
                  aria-label="נקה חיפוש"
                >
                  ×
                </button>
              )}
            </div>
          </div>

          <button
            className={`favorite-toggle ${favCol ? "active" : ""}`}
            onClick={toggleFavorite}
            aria-label={favCol ? "הצג את כל המתכונים" : "הצג רק מועדפים"}
            title={favCol ? "הצג את כל המתכונים" : "הצג רק מועדפים"}
          >
            {favCol ? (
              <FaHeart className="favorite-icon" />
            ) : (
              <FaRegHeart className="favorite-icon" />
            )}
          </button>
        </div>

        {/* Recipe Count */}
        {!isLoading && (
          <div className="recipe-count">
            {favCol
              ? `${filteredRecipes.length} מתכונים מועדפים`
              : filter
              ? `${filteredRecipes.length} תוצאות`
              : `${filteredRecipes.length} מתכונים בסך הכל`}
          </div>
        )}

        {/* Recipe List Content */}
        <div className="recipe-list-content">
          {isLoading ? (
            <div className="recipe-list-loading">
              <GiCook className="loading-icon" />
              <p>טוען מתכונים...</p>
            </div>
          ) : (
            <>
              <NewCard />
              {hasRecipes ? (
                <div className="recipe-grid">
                  {filteredRecipes.map((item, i) => (
                    <div key={i} className="recipe-card-wrapper">
                      <Card item={item} />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="recipe-list-empty">
                  <div className="empty-icon">🔍</div>
                  <h3>המתכון לא נמצא</h3>
                  <p>
                    {filter
                      ? "נסה לחפש עם מילות מפתח אחרות"
                      : favCol
                      ? "אין לך מתכונים מועדפים עדיין"
                      : "אין מתכונים עדיין"}
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}
