import React, { useContext } from "react"
import Box from "@mui/material/Box"
import SpeedDial from "@mui/material/SpeedDial"
import SpeedDialIcon from "@mui/material/SpeedDialIcon"
import SpeedDialAction from "@mui/material/SpeedDialAction"
import FavoriteIcon from "@mui/icons-material/Favorite"
import { red } from "@mui/material/colors"
import RecipeData from "../../Classes/ClassNewRecipe"
import { v4 } from "uuid"
import { doc, setDoc } from "@firebase/firestore"
import { db } from "../../Firebase"
import { ContextData } from "../../App"
import { useNavigate } from "react-router-dom"

export default function AIRecipePlus() {
  const { aiRecipe, user } = useContext(ContextData)
  const navigate = useNavigate()

  const saveRecipe = () => {
    if (!user) {
      alert("לא נמצא משתמש אנא התחבר")
      return
    }

    if (!aiRecipe) {
      alert("אין מתכון לשמירה")
      return
    }

    try {
      const name = aiRecipe.name || "מתכון חדש"
      const ingredients = Array.isArray(aiRecipe.ingredients)
        ? aiRecipe.ingredients
        : []
      const instructions = Array.isArray(aiRecipe.instructions)
        ? aiRecipe.instructions
        : []

      // Create RecipeData instance (passing undefined for optional parameters)
      const newRecipeData = new RecipeData(
        name,
        ingredients,
        instructions,
        user.uid,
        undefined, // typeMeal
        undefined, // timePrep
        undefined, // createTime
        undefined, // isPublic
        undefined, // createDiff
        undefined // shareWhite
      )

      newRecipeData.docId = v4()
      newRecipeData.favorite = true // Save as favorite by default

      // Prepare data for Firebase (remove undefined values)
      const recipeDataToSave = {
        name: newRecipeData.name,
        ingredients: newRecipeData.ingredients,
        instructions: newRecipeData.instructions,
        id: newRecipeData.id,
        favorite: newRecipeData.favorite,
        docId: newRecipeData.docId,
      }

      console.log("Saving recipe:", recipeDataToSave)

      setDoc(doc(db, "recepis", `${newRecipeData.docId}`), recipeDataToSave)
        .then(() => {
          alert("המתכון נוסף למועדפים בהצלחה!")
          navigate("/main")
        })
        .catch((error) => {
          console.error("Error saving recipe to Firebase:", error)
          console.error("Error details:", error.message, error.code)
          alert(`שגיאה בשמירת המתכון: ${error.message || "שגיאה לא ידועה"}`)
        })
    } catch (error) {
      console.error("Error creating recipe object:", error)
      console.error("Error stack:", error.stack)
      alert(`שגיאה ביצירת המתכון: ${error.message || "שגיאה לא ידועה"}`)
    }
  }

  return (
    <>
      <Box>
        <SpeedDial ariaLabel="SpeedDial basic example" icon={<SpeedDialIcon />}>
          <SpeedDialAction
            onClick={saveRecipe}
            icon={<FavoriteIcon sx={{ color: red[500] }} />}
            tooltipTitle={"הוסף למועדפים"}
          />
        </SpeedDial>
      </Box>
    </>
  )
}
