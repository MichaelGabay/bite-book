import React, { useContext, useEffect, useState, useRef } from "react"
import "./Nav.css"
import Burger from "./Burger"
import { ContextData } from "../../App"
import Avatar from "@mui/material/Avatar"
import { getDownloadURL, listAll, ref } from "firebase/storage"
import { chekPremium, storage } from "../../Firebase"
import { RxHamburgerMenu } from "react-icons/rx"
import { AiOutlineClose } from "react-icons/ai"
import { GiCook } from "react-icons/gi"

export default function Nav() {
  const [burger, setBurger] = useState(false)
  const [isClosing, setIsClosing] = useState(false)
  const { user, setPremium } = useContext(ContextData)
  const [img, setImg] = useState(user != null ? user.photoURL : "")
  const navRef = useRef(null)
  const burgerButtonRef = useRef(null)
  const burgerMenuRef = useRef(null)

  // Fetch user image and premium status
  useEffect(() => {
    if (user != null) {
      chekPremium(user.uid, setPremium)
      const imagesListRef = ref(storage, `${user.uid}`)
      listAll(imagesListRef).then((response) => {
        response.items.forEach((item) => {
          getDownloadURL(item).then((url) => {
            if (url) setImg(url)
          })
        })
      })
    }
  }, [user, setPremium])

  // Close burger menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (burger) {
        // Check if click is outside the nav and burger menu
        const isClickOutsideNav =
          navRef.current && !navRef.current.contains(event.target)
        const isClickOutsideButton =
          burgerButtonRef.current &&
          !burgerButtonRef.current.contains(event.target)
        const isClickOnBurgerMenu = event.target.closest(".cardBurger")

        if (isClickOutsideNav && isClickOutsideButton && !isClickOnBurgerMenu) {
          handleCloseBurger()
        }
      }
    }

    if (burger) {
      // Use a small delay to avoid immediate closing
      const timeoutId = setTimeout(() => {
        document.addEventListener("mousedown", handleClickOutside)
        document.addEventListener("touchstart", handleClickOutside)
      }, 100)

      return () => {
        clearTimeout(timeoutId)
        document.removeEventListener("mousedown", handleClickOutside)
        document.removeEventListener("touchstart", handleClickOutside)
      }
    }
  }, [burger])

  // Prevent body scroll when burger menu is open (optional)
  useEffect(() => {
    if (burger) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [burger])

  const toggleBurger = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (burger) {
      // Start exit animation
      setIsClosing(true)
      // Wait for animation to complete before removing from DOM
      setTimeout(() => {
        setBurger(false)
        setIsClosing(false)
      }, 300) // Match animation duration
    } else {
      setBurger(true)
      setIsClosing(false)
    }
  }

  const handleCloseBurger = () => {
    setIsClosing(true)
    setTimeout(() => {
      setBurger(false)
      setIsClosing(false)
    }, 300)
  }

  return (
    <nav id="navbar" className="navbar" ref={navRef}>
      <div className="navbar-container">
        <div className="navbar-content">
          {/* Logo Section */}
          <div className="navbar-logo-section">
            <div className="logo-wrapper">
              <GiCook className="logo-icon" size={40} aria-hidden="true" />
            </div>
            <h1 className="navbar-brand">BiteBook</h1>
          </div>

          {/* User Info Section */}
          <div className="navbar-user-section">
            {!burger && user && (
              <div className="user-info">
                <span className="user-name">{user.displayName}</span>
                <Avatar
                  className="user-avatar"
                  alt={user.displayName || "User"}
                  src={img || undefined}
                />
              </div>
            )}
          </div>

          {/* Burger Menu Button */}
          <div className="navbar-menu-toggle">
            <button
              ref={burgerButtonRef}
              className="burger-button"
              onClick={toggleBurger}
              aria-label={burger ? "Close menu" : "Open menu"}
              aria-expanded={burger}
              type="button"
            >
              <div className="burger-icon-wrapper">
                {burger ? (
                  <AiOutlineClose
                    size={28}
                    className="burger-icon"
                    aria-hidden="true"
                  />
                ) : (
                  <RxHamburgerMenu
                    size={28}
                    className="burger-icon"
                    aria-hidden="true"
                  />
                )}
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Burger Menu */}
      {burger && (
        <div
          ref={burgerMenuRef}
          className={`burger-menu-wrapper ${
            isClosing ? "burger-menu-exit" : "burger-menu-enter"
          }`}
        >
          <Burger img={img} />
        </div>
      )}
    </nav>
  )
}
