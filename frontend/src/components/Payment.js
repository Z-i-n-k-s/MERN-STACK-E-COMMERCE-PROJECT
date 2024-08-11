import React, { useState } from "react";
import { FaWindowClose } from "react-icons/fa";
import { FaUserLarge } from "react-icons/fa6";
import Audio, { Bars, ThreeCircles, ThreeDots } from "react-loader-spinner";
import displayBDTCurrency from "../helpers/displayCurrency";
import SummaryApi from "../common";
import { useNavigate } from "react-router-dom";

const PaymentDetails = ({totalItems,totalItemsPrice,onClose, cartItems,callFunc }) => {
    const [showLoader, setShowLoader] = useState(false);

    const navigate = useNavigate();

    const [imgError, setImgError] = useState(false);
    // console.log(userId)

    console.log("cartItems from payment",cartItems)

    const handelPayment = async()=>{
      setShowLoader(true)

      const response = await fetch(SummaryApi.order.url,{
        method : SummaryApi.order.method,
        credentials : 'include',
        headers : {
            "content-type" : 'application/json'
        },
        body : JSON.stringify({
          cartItems : cartItems,
          totalPrice:totalItemsPrice
      })
    })
    const responseData = await response.json()
    if(responseData.success){
      setShowLoader(false)
      navigate("/success")
      callFunc()

    }

    }
    return (
        <div className="fixed top-0 bottom-0 left-0 right-0 w-full z-10 flex justify-center items-center bg-slate-200 bg-opacity-50">
          {showLoader ? (
              <div className="flex justify-center items-center bg-white shadow-lg p-6 w-full max-w-lg rounded-lg h-40">
              <ThreeDots type="ThreeDots" color="#7542ff" height={80} width={80} />
            </div>
          ) : (
            <div className="relative bg-white shadow-lg p-6 w-full max-w-lg rounded-lg">
              <button
                className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
                onClick={onClose}
              >
                <FaWindowClose size={24} />
              </button>
              <h1 className="pb-4 text-2xl font-semibold text-center text-gray-800">
                Payment Details
              </h1>
              <div className="flex flex-col items-center my-5">
                
                <div className="text-gray-700 w-full text-center my-3">
                  <p className="p-2 text-lg">
                    <span className="font-medium">Total Items in Cart : </span> {totalItems}
                  </p>
                  <p className="p-2 text-lg">
                    <span className="font-medium">Total Price :</span> {displayBDTCurrency(totalItemsPrice)}
                  </p>
                  
                </div>
    
                <div className="flex justify-center mt-4">
                  <button
                    className="bg-green-400 text-black px-4 py-2 rounded-lg shadow hover:bg-green-600 hover:text-white transition duration-300"
                    onClick={handelPayment}
                  >
                    Confirm
                  </button>
                  <button
                    className="bg-red-400 text-gray-800 px-4 py-2 rounded-lg shadow ml-4 hover:bg-red-600 transition duration-300 hover:text-white"
                    onClick={onClose}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      );
};

export default PaymentDetails;
