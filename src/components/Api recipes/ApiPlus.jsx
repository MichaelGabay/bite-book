import React, { useContext } from 'react'
import Box from "@mui/material/Box";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import CreateIcon from "@mui/icons-material/Create";
import FavoriteIcon from '@mui/icons-material/Favorite';
import HomeIcon from '@mui/icons-material/Home';
import { red } from '@mui/material/colors';
import { green } from '@mui/material/colors';
import RecipeData from '../../Classes/ClassNewRecipe';
import { v4 } from 'uuid';
import { doc, setDoc } from '@firebase/firestore';
import { db } from '../../Firebase';
import { ContextData } from '../../App';

export default function ApiPlus() {
  const { previewUrl,apiRecpie, user } = useContext(ContextData);
  


let seti = function ingri(){
let rec = [];
apiRecpie.extendedIngredients.map((item)=>{
  rec = [...rec , item.original]
})
return rec
}


  let set = function setRecipe() {
    let name = apiRecpie.title;
    let ingredients = seti();
    let instructions = apiRecpie.instructions; 

    instructions = instructions.split("\n");
    
    let newRecipeData = new RecipeData(
      name,
      ingredients,
      instructions,
      user.uid,
     
    );
    newRecipeData.imgUrl = apiRecpie.image;
    newRecipeData.docId = v4();
    console.log(newRecipeData);
    setDoc(doc(db, "recepis", `${newRecipeData.docId}`), {
      ...newRecipeData,
    });
  }

  return (
    <>
      <Box>
        <SpeedDial ariaLabel="SpeedDial basic example" icon={<SpeedDialIcon />}>
          <SpeedDialAction
          onClick={user?set:()=>{
            alert("לא נמצא משתמש אנא התחבר")
          }}
            icon={
             <FavoriteIcon  sx={{ color: red[500] }}/>
            }
            tooltipTitle={"הכנס למתכונים שלי"}
          />
          <SpeedDialAction
          className=""
            icon={
             <a href={apiRecpie.sourceUrl} target='_blank'><HomeIcon  sx={{ color: green[500] }}/></a>
            }
            tooltipTitle={"לאתר המתכון"}
          />
        </SpeedDial>
      </Box>
    </>
  )
}
