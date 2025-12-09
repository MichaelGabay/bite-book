import React, { useContext } from "react"
import { logout } from "../../Firebase"
import { Link, useNavigate } from "react-router-dom"
import Avatar from "@mui/material/Avatar"
import { ContextData } from "../../App"
import { BiLogIn, BiLogOut } from "react-icons/bi"
import "./Nav.css"
import { FaUserCircle } from "react-icons/fa"
import { TbFileSearch, TbPremiumRights } from "react-icons/tb"
import { FcAbout } from "react-icons/fc"
import { AiOutlineRobot } from "react-icons/ai"

export default function Burger({ img }) {
  const { SetLoading, setCurrentOpen, user, SetUser } = useContext(ContextData)
  const navigate = useNavigate()

  async function handleLogout() {
    SetLoading(true)
    try {
      await logout()
      setCurrentOpen(null)
      SetUser(null)
      navigate("/")
    } catch {
      alert("Error!")
    }
    SetLoading(false)
  }

  return (
    <>
      <div className="cardBurger" onClick={(e) => e.stopPropagation()}>
        <div className="d-flex col-12 mt-3">
          <div className="col-9 px-0 d-flex h5 justify-content-center align-items-center mb-0">
            <span className="bold">
              {user === undefined ? " " : `${user?.displayName}`}
            </span>
          </div>
          <div className="col-3 px-0 d-flex justify-content-start">
            <Avatar
              className="border "
              alt="User Name"
              src={user === undefined ? " " : `${img}`}
            />
          </div>
        </div>
        <div className="col-12 d-flex justify-content-center mt-4 mb-2">
          <div className="line col-10"></div>
        </div>
        <div className="row mr-0 ml-0">
          {user && (
            <>
              <Link
                to={"/Main/UpdateUser"}
                className="d-flex justify-content-end pl-0 pr-0 col-11 nav-link"
              >
                פרטי משתמש{" "}
                <div className="d-flex align-items-center ml-2 ">
                  <FaUserCircle size={20} />
                </div>
              </Link>
              <Link
                to={"/main/pro"}
                className="d-flex justify-content-end pl-0 pr-0  col-11 nav-link"
              >
                {" "}
                שדרג לפרימיום{" "}
                <div className="d-flex align-items-center ml-2 ">
                  <TbPremiumRights size={20} />
                </div>
              </Link>
            </>
          )}
          <Link
            to={"/main/apiMain"}
            className="d-flex justify-content-end pl-0 pr-0 col-11 nav-link"
          >
            חפש מתכון חדש{" "}
            <div className="d-flex align-items-center ml-2 ">
              <TbFileSearch size={20} />
            </div>
          </Link>
          <Link
            to={"/main/aiGenerate"}
            className="d-flex justify-content-end pl-0 pr-0 col-11 nav-link"
          >
            צור מתכון עם AI{" "}
            <div className="d-flex align-items-center ml-2 ">
              <AiOutlineRobot size={20} />
            </div>
          </Link>
          <Link
            to={"/aboutus"}
            className="d-flex justify-content-end pl-0 pr-0 col-11 nav-link"
          >
            קצת עלינו{" "}
            <div className="d-flex align-items-center ml-2 ">
              <FcAbout size={20} />
            </div>
          </Link>
          <div className="col-12 d-flex justify-content-center mt-2 mb-4">
            <div className="line col-10"></div>
          </div>
          <div className="d-flex justify-content-center mb-3 col-12">
            <button
              onClick={handleLogout}
              className={`${
                user ? "bg-danger" : "bg-primary"
              }  btn d-flex justify-content-start`}
              style={{ borderRadius: "8px" }}
            >
              {user ? (
                <>
                  <div>Log Out</div>
                  <div className="ml-2">
                    <BiLogOut size={20} />
                  </div>
                </>
              ) : (
                <>
                  {" "}
                  <div>Log In</div>
                  <div className="ml-2">
                    <BiLogIn size={20} />
                  </div>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
