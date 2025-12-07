import React, { useContext } from "react";
import { IoMdReturnRight } from "react-icons/io";
import { Link } from "react-router-dom";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import "./Pro.css";
import { ContextData } from "../../App";
import emailjs from '@emailjs/browser';
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../Firebase";


export default function CreditCard() {
  const { ProPaypal,user } = useContext(ContextData);

  function send(){
 const emailContent = {
  to_name: user.displayName,
  to_email:user.email,
  pro: ProPaypal.name,
  message:'thenk you'
}
    emailjs.send('service_7eaaw8y', 'template_lgjhgqk', emailContent, 'q6Xfc64D1-5xdYKoX')
    .then((result) => {
        console.log(result.text);
    }, (error) => {
        console.log(error.text);
    });
  }

  function UpdateUser(){
    let userUp={
    userId: user.uid,
    premium: ProPaypal.name
    }

    setDoc(doc(db, "premium", `${user.uid}`), {
      ...userUp,
    });
  };


  return (
    <>
      <div className="bgImg d-flex align-items-center">
        <Link to={"/main/pro"}>
          <div className="btn back-button">
            <div>
              <IoMdReturnRight size={30} />
            </div>
          </div>
        </Link>
        <div className="RecipeViewContiner container rtl ">
          <div className="row justify-content-center">
            <h3 className="col-12 d-flex justify-content-center my-5 text-pro ">
              {ProPaypal.name} תשלום לפרימיום
            </h3>
            <div className="col-6 textProPrice">
              <ul>
                <li>{ProPaypal.name}</li>
                <li>{ProPaypal.rec}</li>
                <li>ללא פרסומות</li>
              </ul>
              <h3 className="d-flex justify-content-center">  מחיר {ProPaypal.price} ₪</h3>
            </div>
            <div className="col-6">
              <PayPalScriptProvider
                options={{
                  "client-id":
                    "AcmyJCjf2k5nnCrAwZU7UsYgK5R-yhHM9y-hZVDvvhJip7-MfWwNOSmqkCMt3ZmjTgYnQ738LUtYNSco",
                  currency: "ILS",
                }}
              >
                <PayPalButtons
                  createOrder={(data, actions) => {
                    return actions.order.create({
                      purchase_units: [
                        {
                          amount: {
                            value: ProPaypal.price,
                          },
                        },
                      ],
                    });
                  }}
                  onApprove={async (data, actions) => {
                    const details = await actions.order.capture();
                    const name = details.payer.name.given_name;
                    send();
                    UpdateUser();
                    alert("Transaction completed by " + name);
                  }}
                />
              </PayPalScriptProvider>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
