import React, { useContext, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import Login from "../Log in/Login"
import "./HomePage.css"
import { useAuth } from "../../Firebase"
import { ContextData } from "../../App"
import { GiCook } from "react-icons/gi"
import { FaUtensils, FaBookOpen } from "react-icons/fa"

export default function HomePage() {
  const { SetUser } = useContext(ContextData)
  const currentUser = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (currentUser) SetUser(currentUser)
  }, [currentUser, SetUser])

  if (currentUser) {
    navigate("/main")
    return null
  }

  return (
    <div className="homepage-container">
      {/* Background with overlay */}
      <div className="homepage-background">
        <div className="background-overlay"></div>
        <div className="background-pattern"></div>
      </div>

      {/* Content */}
      <div className="homepage-content">
        {/* Left Section - Branding */}
        <div className="homepage-branding">
          <div className="brand-logo-wrapper">
            <GiCook className="brand-logo-icon" size={80} />
          </div>
          <h1 className="brand-title">
            <span className="brand-title-main">BiteBook</span>
            <span className="brand-title-accent">מתכונים שאוהבים לאכול</span>
          </h1>
          <div className="brand-features">
            <div className="feature-item">
              <FaBookOpen className="feature-icon" />
              <span>ספר מתכונים אישי</span>
            </div>
            <div className="feature-item">
              <FaUtensils className="feature-icon" />
              <span>שתף מתכונים</span>
            </div>
            <div className="feature-item">
              <GiCook className="feature-icon" />
              <span>חפש מתכונים חדשים</span>
            </div>
          </div>
        </div>

        {/* Right Section - Login */}
        <div className="homepage-login-section">
          <div className="login-wrapper">
            <Login />
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="homepage-decorations">
        <div className="decoration-circle decoration-1"></div>
        <div className="decoration-circle decoration-2"></div>
        <div className="decoration-circle decoration-3"></div>
      </div>
    </div>
  )
}
