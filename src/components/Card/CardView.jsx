import { doc, setDoc } from "firebase/firestore"
import { getDownloadURL, listAll, ref } from "firebase/storage"
import React, { useContext, useEffect, useState } from "react"
import { ContextData } from "../../App"
import { db, storage } from "../../Firebase"
import "./Card.css"
import { FaHeart, FaRegHeart } from "react-icons/fa"

export default function CardView({ item }) {
  const { setCurrentOpen, setRun } = useContext(ContextData)
  const [favo, setFavo] = useState(false)
  const [mainImg, setMainImg] = useState([])

  useEffect(() => {
    setFavo(item?.favorite || false)
    setMainImg([])

    if (item != null && item.docId) {
      const imagesListRef = ref(storage, `${item.docId}`)
      listAll(imagesListRef)
        .then((response) => {
          response.items.forEach((item) => {
            getDownloadURL(item).then((url) => {
              setMainImg((mainImg) => [...mainImg, url])
            })
          })
        })
        .catch((error) => {
          console.log("Error loading images:", error)
        })
    }
  }, [item])

  const open = () => {
    setCurrentOpen(item)
    setRun(true)
  }

  function favoriteRecipe(e) {
    e.stopPropagation()
    const docref = doc(db, "recepis", item.docId)
    // Remove undefined values before saving
    const cleanData = Object.fromEntries(
      Object.entries({ ...item, favorite: !favo }).filter(
        ([_, value]) => value !== undefined
      )
    )
    setDoc(docref, cleanData)
    setFavo(!favo)
  }

  const defaultImage =
    "https://i.imagesup.co/images2/4c7cc05dd420f94ff35456056d5a114499bbbb62.jpg"

  const displayName = item?.name || "מתכון ללא שם"

  return (
    <div
      className="recipe-card"
      onClick={open}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault()
          open()
        }
      }}
    >
      <div className="recipe-card-image-wrapper">
        <img
          className="recipe-card-image"
          src={mainImg[0] || item?.imgUrl || defaultImage}
          alt={item?.name || "Recipe"}
          loading="lazy"
        />
        <div className="recipe-card-overlay">
          <button
            className="recipe-card-favorite"
            onClick={favoriteRecipe}
            aria-label={favo ? "הסר ממועדפים" : "הוסף למועדפים"}
            title={favo ? "הסר ממועדפים" : "הוסף למועדפים"}
          >
            {favo ? (
              <FaHeart className="favorite-icon-filled" />
            ) : (
              <FaRegHeart className="favorite-icon-outline" />
            )}
          </button>
        </div>
      </div>
      <div className="recipe-card-content">
        <h3 className="recipe-card-title">{displayName}</h3>
      </div>
    </div>
  )
}
