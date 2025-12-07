import React, { useContext, useEffect, useState } from "react"
import "./RecipeView.css"
import { Carousel } from "react-responsive-carousel"
import "react-responsive-carousel/lib/styles/carousel.min.css"
import { ContextData } from "../../App"
import Plus from "./Plus"
import { getDownloadURL, listAll, ref } from "@firebase/storage"
import { storage } from "../../Firebase"
import { AiOutlineCloseCircle } from "react-icons/ai"
import { GiCook } from "react-icons/gi"
import { FaUtensils, FaListUl } from "react-icons/fa"

export default function RecipeView() {
  const [data, setData] = useState(undefined)
  const {
    currentOpen,
    setCurrentOpen,
    componentRef,
    previewUrl,
    setPreviewUrl,
    setImgFile,
  } = useContext(ContextData)

  useEffect(() => {
    setData(currentOpen)
    setImgFile([])
    setPreviewUrl([])
    if (currentOpen != null) {
      const imagesListRef = ref(
        storage,
        `${currentOpen.docId == null ? "" : currentOpen.docId}`
      )
      listAll(imagesListRef).then((response) => {
        response.items.forEach((item) => {
          setImgFile((imgFile) => [...imgFile, item])
          getDownloadURL(item).then((url) => {
            setPreviewUrl((previewUrl) => [...previewUrl, url])
          })
        })
      })
    }
  }, [currentOpen, setImgFile, setPreviewUrl])

  const closeRecipe = () => {
    setData(undefined)
    setCurrentOpen(null)
  }

  const defaultImage =
    "https://i.imagesup.co/images2/eb71cc96839f80c8a1e3f35783f6b28984ca90d2.png"

  return (
    <div className="recipe-view-container">
      {data == undefined || currentOpen == undefined ? (
        <div className="recipe-view-empty">
          <div className="empty-logo-wrapper">
            <GiCook className="empty-logo-icon" size={120} />
          </div>
          <h2 className="empty-title">בחר מתכון להצגה</h2>
          <p className="empty-subtitle">
            לחץ על מתכון מהרשימה כדי לראות את הפרטים
          </p>
        </div>
      ) : (
        <div className="recipe-view-card" ref={componentRef}>
          {/* Header - Fixed */}
          <div className="recipe-view-header">
            <h1 className="recipe-view-title">{currentOpen.name}</h1>
            <button
              className="recipe-view-close"
              onClick={closeRecipe}
              aria-label="סגור מתכון"
            >
              <AiOutlineCloseCircle />
            </button>
          </div>

          {/* Recipe Images Preview */}
          {previewUrl.length > 0 && (
            <div className="recipe-images-preview">
              {previewUrl.slice(0, 4).map((item, i) => (
                <div key={i} className="recipe-preview-image-wrapper">
                  <img
                    className="recipe-preview-image"
                    src={item}
                    alt={`${currentOpen.name} - תמונה ${i + 1}`}
                    loading="lazy"
                  />
                </div>
              ))}
              {previewUrl.length > 4 && (
                <div className="recipe-preview-more">
                  <span>+{previewUrl.length - 4}</span>
                </div>
              )}
            </div>
          )}

          {/* Scrollable Content */}
          <div className="recipe-view-card-content">
            {/* Image Carousel */}
            <div className="recipe-view-images">
              <Carousel
                showThumbs={false}
                autoPlay={true}
                transitionTime={3000}
                infiniteLoop={true}
                showStatus={true}
                showIndicators={previewUrl.length > 1}
              >
                {previewUrl.length === 0
                  ? [defaultImage].map((item, i) => (
                      <div key={i} className="carousel-image-wrapper">
                        <img
                          className="carousel-image"
                          src={item}
                          alt={currentOpen.name}
                        />
                      </div>
                    ))
                  : previewUrl.map((item, i) => (
                      <div key={i} className="carousel-image-wrapper">
                        <img
                          className="carousel-image"
                          src={item}
                          alt={`${currentOpen.name} - תמונה ${i + 1}`}
                        />
                      </div>
                    ))}
              </Carousel>
            </div>

            {/* Ingredients Section */}
            <div className="recipe-view-section-content">
              <div className="section-header">
                <FaListUl className="section-icon" />
                <h2 className="section-title">מרכיבים</h2>
              </div>
              <div className="ingredients-list">
                {currentOpen.ingredients.map((item, i) => (
                  <div key={i} className="ingredient-item" dir="rtl">
                    <span className="ingredient-bullet">•</span>
                    <span className="ingredient-text">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Instructions Section */}
            <div className="recipe-view-section-content">
              <div className="section-header">
                <FaUtensils className="section-icon" />
                <h2 className="section-title">אופן הכנה</h2>
              </div>
              <div className="instructions-list">
                {currentOpen.instructions.map((item, i) => (
                  <div key={i} className="instruction-item" dir="rtl">
                    <span className="instruction-number">{i + 1}</span>
                    <span className="instruction-text">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Action Buttons - At the end */}
          <div className="recipe-view-actions">
            <Plus />
          </div>
        </div>
      )}
    </div>
  )
}
