import React, {useContext, useEffect, useState} from "react";
import "./Nav.css";
import Burger from "./Burger";
import { ContextData } from "../../App";
import Avatar from "@mui/material/Avatar";
import { getDownloadURL, listAll, ref } from "firebase/storage";
import { chekPremium, storage } from "../../Firebase";
import { RxHamburgerMenu } from "react-icons/rx";
import { AiOutlineClose } from "react-icons/ai";

export default function Nav() {
  const [burger, sutBurger] = useState(false);
  const { user, setPremium } = useContext(ContextData);
  const [img, setImg] = useState(user != null ? user.photoURL : "");

  useEffect(() => {
    if (user != null) {
      chekPremium(user.uid, setPremium);
      const imagesListRef = ref(storage, `${user.uid}`);
      listAll(imagesListRef).then((response) => {
        response.items.forEach((item) => {
          getDownloadURL(item).then((url) => {
            if (url)
              setImg(url);
          });
        });
      });
    }
  }, [user])



  useEffect(() => {
    window.addEventListener("click", () => sutBurger(false))
  }, [])

  return (
    <div id="e" className="container-fluid sticky-top">
      <div className="myNav row ">
        <div className="col-2 d-flex">
          <div className="logoNav">
            <img
              className="logoNavImg"
              src="https://i.imagesup.co/images2/eb71cc96839f80c8a1e3f35783f6b28984ca90d2.png"
              alt=""
            />
          </div>
          <div className="col-sm-6 col-5 pr-0 pl-0 d-flex align-items-center">
            <h2 className="myFont">BiteBook</h2>
          </div>
        </div>

        <div className="col-3 fst-italic fs-2 pr-0 pl-0 d-flex justify-content-center align-items-center">
          {!burger ? (
            <div className="name d-flex align-content-center">
              <div className="mt-2 mr-3 h6 font-weight-bold text-center">
                {user ? `${user.displayName}` : " "}
              </div>
              <Avatar
                className="border mt-2 mt-sm-0 "
                alt="User Name"
                src={user ? `${img}` : " "}
              />
            </div>
          ) : (
            ""
          )}
        </div>
        <div className="col-sm-1 col-2 pr-0 pl-0 d-flex justify-content-center">
          <div
            className=""
            onClick={(e) => {
              e.stopPropagation();
              sutBurger(!burger);
            }}
          >
            <div className="thebur">
              <div className="d-flex mt-2">
                {burger ? (
                  <AiOutlineClose
                    size={50}
                    style={{ color: "rgba(70, 58, 58, 0.65)" }}
                    title="לחץ"
                  />
                ) : (
                  <RxHamburgerMenu
                    size={50}
                    style={{ color: "rgba(70, 58, 58, 0.65)" }}
                    title="לחץ"
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      {burger ? (
        <div>
          <div className="d-flex justify-content-end">
            <Burger img={img} />
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
