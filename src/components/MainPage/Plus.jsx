import React from "react"
import PrintIcon from "@mui/icons-material/Print"
import CreateIcon from "@mui/icons-material/Create"
import DeleteForeverIcon from "@mui/icons-material/DeleteForever"
import { pink } from "@mui/material/colors"
import { useReactToPrint } from "react-to-print"
import {
  WhatsappShareButton,
  WhatsappIcon,
  TelegramShareButton,
  TelegramIcon,
} from "react-share"
import { useContext } from "react"
import { ContextData } from "../../App"
import { deleteDoc, doc } from "firebase/firestore"
import { db, storage } from "../../Firebase"
import { Link } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { deleteObject, ref } from "firebase/storage"
import "./Plus.css"

export default function Plus() {
  const { currentOpen, setCurrentOpen, imgFile, componentRef, setDeleteRecipe } =
    useContext(ContextData)

  let str =
    `*שם מתכון* \n\n ${currentOpen?.name}\n` +
    "\n*מרכיבים*\n\n" +
    `${"• " + currentOpen?.ingredients?.toString().replaceAll(",", "\n• ")}` +
    "\n\n*אופן הכנה*\n\n" +
    `${"~ " + currentOpen?.instructions?.toString().replaceAll(",", "\n~ ")}` +
    "\n\n\n\n" +
    "#my_recipe_book"

  const daletdoc = async () => {
    setDeleteRecipe("true")
    for (let index = 0; index < imgFile.length; index++) {
      const desertRef = ref(storage, `${currentOpen.docId}/${imgFile[index].name}`)
      deleteObject(desertRef)
        .then((e) => {
          console.log("sucsess")
        })
        .catch((error) => {
          console.log(error)
        })
    }
    await deleteDoc(doc(db, "recepis", currentOpen.docId))
    setCurrentOpen(undefined)
  }

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  })

  const ConfirmDeletion = () => {
    let dal = window.confirm(" האם אתה בטוח רוצה למחוק  ?")
    if (dal) {
      daletdoc()
    }
  }

  return (
    <>
      <div className="recipe-actions-horizontal">
        <WhatsappShareButton url={str} className="action-button">
          <WhatsappIcon size={32} round={true} />
        </WhatsappShareButton>

        <TelegramShareButton url={str} className="action-button">
          <TelegramIcon size={32} round={true} />
        </TelegramShareButton>

        <button
          className="action-button"
          onClick={handlePrint}
          aria-label="הדפס מתכון"
          title="הדפס מתכון"
        >
          <PrintIcon sx={{ color: "#1976d2", fontSize: "1.5rem" }} />
        </button>

        <Link to="/recipeUp" className="action-button" aria-label="ערוך מתכון" title="ערוך מתכון">
          <CreateIcon sx={{ color: "#9c27b0", fontSize: "1.5rem" }} />
        </Link>

        <button
          className="action-button action-button-danger"
          onClick={ConfirmDeletion}
          aria-label="מחק מתכון"
          title="מחק מתכון"
        >
          <DeleteForeverIcon sx={{ color: pink[500], fontSize: "1.5rem" }} />
        </button>
      </div>
      <ToastContainer />
    </>
  )
}
