import React from "react";
import "./AboutUs.css";
import "../newRecipe/NewRecipe.css";
import { IoMdReturnRight } from "react-icons/io";
import { SiFacebook, SiGmail, SiInstagram } from "react-icons/si";
import { Link } from "react-router-dom";

export default function AboutUs() {
  return (
    <>
      <div className="bgImg ">
        <Link to={"/"}>
          <div className="btn back-button">
            <div>
              <IoMdReturnRight size={30} />
            </div>
          </div>
        </Link>
        <div className="container-fluid w-100 d-flex justify-content-center">
          <div className="aboutUs mt-5 mb-5 col-9">
            <div>
              <div className="ml-3 mr-3">
                <samp className="d-flex h1 text-center mt-4 justify-content-center color-bg">
                קצת עלינו
              </samp>
              <p className="mt-4 text-center h6 mb-4">
                אנו סטודנטים ללימודי תוכנה המתמחים בפיתוח תוכנה ועיצוב אתרים. אנו
                פועלים על פרויקט של אתר לספר מתכונים אישי, שמטרתו לאפשר
                למשתמשים לאחסן לחפש ולשתף מתכונים שונים בצורה נוחה ומהירה. אנו משתמשים
                בטכנולוגיות חדשות כדי לפתח אתר מתקדם ומתאים לצרכי המשתמשים. אנו
                עובדים קשה כדי ליצור מוצר ייחודי ויעיל שיספק את הצרכים של
                המשתמשים בצורה מקצועית ומהירה. אני מצפה לראות את הפרויקט שלנו
               .צומח ומתפתח לאתר מוצלח ונגיש לכל משתמש 
                <br />
              <span className="chat">.בנתיים אם יש הצעות ליעול ושיפור המערכת אנא צרו קשר *</span>
              </p>
              <div className="d-flex justify-content-center">
              <samp  className="chat h5 text-center">*_* Written by Chat GPT *_*</samp>
              </div>
              </div>
              <div>
                <div className="d-flex justify-content-center mt-5 about-text">
                  <h3 className="col-8 color-bg"> פרטים ליצירת קשר</h3>
                </div>
                <div className="row d-flex justify-content-center mt-4 mb-4">
                  <div className="card card-style m-1">
                    <div className="card-body ">
                      <div className="d-flex justify-content-center">
                        <samp className="about-text d-flex fontW align-items-center">
                          צרו איתנו קשר דרך המייל
                        </samp>
                        <lord-icon
                          src="https://cdn.lordicon.com/egpbfgcp.json"
                          trigger="hover"
                          colors="primary:#c71f16,secondary:#109121"
                          style={{ width: "70px", height: "70px" }}
                        ></lord-icon>
                      </div>
                      <span className="card-text row d-flex justify-content-center mt-2 nav-link">
                        <SiGmail className="mt-1 mb-2" size={20} color="red" />
                        <a
                          className="ml-2 myFont linkStyle"
                          href="mailto:myrecipebook23@gmail.com"
                        >
                          myrecipebook23@gmail.com
                        </a>
                      </span>
                    </div>
                  </div>
                  <div className="card card-style m-1">
                    <div className="card-body ">
                      <div className="d-flex justify-content-center">
                        <samp className="about-text d-flex fontW align-items-center">
                          {" "}
                          עקבו אחרינו בדף האינסטגרם
                        </samp>
                        <lord-icon
                          src="https://cdn.lordicon.com/ridbdkcb.json"
                          trigger="hover"
                          colors="primary:#e8308c,secondary:#c76f16"
                          style={{ width: "70px", height: "70px" }}
                        ></lord-icon>
                      </div>
                      <span className="card-text row d-flex justify-content-center mt-2">
                        <SiInstagram
                          className="mt-1 mb-2"
                          size={20}
                          color="#e8308c"
                        />
                        <a
                          className="ml-2 myFont linkStyle"
                          target={"_blank"}
                          href="https://www.instagram.com/myrecipebook2023/"
                        >
                          myrecipebook2023
                        </a>
                      </span>
                    </div>
                  </div>
                  <div className="card card-style m-1">
                    <div className="card-body ">
                      <div className="d-flex justify-content-center">
                        <samp className="about-text d-flex fontW align-items-center">
                          {" "}
                          בקרו בדף שלנו בפייסבוק{" "}
                        </samp>
                        <lord-icon
                          src="https://cdn.lordicon.com/ppezgpha.json"
                          trigger="hover"
                          colors="primary:#2516c7,secondary:#848484"
                          style={{ width: "70px", height: "70px" }}
                        ></lord-icon>
                      </div>
                      <span className="card-text row d-flex justify-content-center mt-2">
                        <SiFacebook
                          className="mt-1 mb-2"
                          size={20}
                          color="#2516c2"
                        />
                        <a
                          className="ml-2 myFont linkStyle"
                          target={"_blank"}
                          href="https://www.facebook.com/profile.php?id=100091541614136"
                        >
                          MyRecipeBook
                        </a>
                      </span>
                    </div>
                  </div>
                  </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
