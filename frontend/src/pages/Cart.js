import React, { useContext, useEffect, useState } from "react";
import SummaryApi from "../common";
import Context from "../context";
import displayBDTCurrency from "../helpers/displayCurrency";
import { MdDelete } from "react-icons/md";
import {loadStripe} from '@stripe/stripe-js';

const Cart = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const context = useContext(Context);
  const loadingCart = new Array(4).fill(null);

  const fetchData = async () => {
    setLoading(true);
    const response = await fetch(SummaryApi.addToCartProductView.url, {
      method: SummaryApi.addToCartProductView.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
    });

    const responseData = await response.json();
    console.log("data cart", responseData);
    if (responseData.success) {
      setData(responseData.data);
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  const increaseQty = async(id,qty) =>{
    const response = await fetch(SummaryApi.updateCartProduct.url,{
        method : SummaryApi.updateCartProduct.method,
        credentials : 'include',
        headers : {
            "content-type" : 'application/json'
        },
        body : JSON.stringify(
            {   
                _id : id,
                quantity : qty + 1
            }
        )
    })

    const responseData = await response.json()


    if(responseData.success){
        fetchData()
    }
}

const decraseQty = async(id,qty) =>{
  if(qty >= 2){
       const response = await fetch(SummaryApi.updateCartProduct.url,{
           method : SummaryApi.updateCartProduct.method,
           credentials : 'include',
           headers : {
               "content-type" : 'application/json'
           },
           body : JSON.stringify(
               {   
                   _id : id,
                   quantity : qty - 1
               }
           )
       })

       const responseData = await response.json()


       if(responseData.success){
           fetchData()
       }
   }
}

const deleteCartProduct = async(id)=>{
  const response = await fetch(SummaryApi.deleteCartProduct.url,{
      method : SummaryApi.deleteCartProduct.method,
      credentials : 'include',
      headers : {
          "content-type" : 'application/json'
      },
      body : JSON.stringify(
          {   
              _id : id,
          }
      )
  })

  const responseData = await response.json()

  if(responseData.success){
      fetchData()
      context.fetchUserAddToCart()
  }
}

const handelPayment = async()=>{
  const stripePromise = await loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY)
  
  const response = await fetch(SummaryApi.payment.url,{
    method : SummaryApi.payment.method,
    credentials : 'include',
    headers : {
        "content-type" : 'application/json'
    },
    body : JSON.stringify({
      cartItems : data
  })
}

)               

const responseData = await response.json()

if(responseData?.id){
  stripePromise.redirectToCheckout({ sessionId : responseData.id})
}

console.log("payment response",responseData)

}

const totalQty = data.reduce((previousValue,currentValue)=> previousValue + currentValue.quantity,0)
const totalPrice = data.reduce((preve,curr)=> preve + (curr.quantity * curr?.productId?.sellingPrice) ,0)

return (
  <div className="container mx-auto">
  <div className="text-center text-lg my-3">
    {data.length === 0 && !loading && <p className="text-lg text-gray-600">No items in cart</p>}
  </div>

  <div className="flex flex-col lg:flex-row gap-10 justify-between p-4 items-start">
    {/* View product */}
    <div className="w-full max-w-3xl">
      {loading ? (
        loadingCart.map((el,index) => (
          <div
            key={el + "Cart Product Loading" +index}
            className="w-full bg-gray-200 h-32 my-3 border border-gray-300 animate-pulse rounded-lg"
          >
            Loading...
          </div>
        ))
      ) : (
        <div>
          {data.map((product, index) => (
            <div
              key={product?._id + "Cart Product"}
              className="w-full bg-white shadow-md h-32 my-4 border border-gray-300 rounded-lg grid grid-cols-[128px,1fr] transition-transform transform hover:scale-105 duration-300"
            >
              <div className="w-32 h-32 p-2">
                <img
                  src={product?.productId?.productImage[0]}
                  className="w-full h-full object-contain rounded-lg transition-transform transform hover:scale-110 duration-300"
                  alt={product?.productId?.productName}
                />
              </div>
              <div className="px-4 pt-2 pb-5 relative">
                {/* Delete product */}
                <div
                  className="absolute right-0 text-red-600 rounded-full p-2 hover:bg-red-600 hover:text-white cursor-pointer transition duration-300"
                  onClick={() => deleteCartProduct(product?._id)}
                >
                  <MdDelete size={20} />
                </div>
                <h2 className="text-lg lg:text-xl text-ellipsis overflow-hidden line-clamp-1 font-semibold">
                  {product?.productId?.productName}
                </h2>
                <p className="capitalize text-gray-600">
                  {product?.productId?.category}
                </p>
                <div className="flex items-center justify-between">
                  <p className="text-blue-600 font-medium text-lg">
                    {displayBDTCurrency(product?.productId?.sellingPrice)}
                  </p>
                  <p className="text-gray-600 font-semibold text-lg">
                    {displayBDTCurrency(
                      product?.productId?.sellingPrice * product?.quantity
                    )}
                  </p>
                </div>
                <div className="flex items-center gap-3 mt-1">
                  <button
                    className="border border-orange-600 text-orange-800 hover:bg-orange-500 hover:text-white w-6 h-6 flex justify-center items-center rounded transition duration-300"
                    onClick={() => decraseQty(product?._id, product?.quantity)}
                  >
                    -
                  </button>
                  <span>{product?.quantity}</span>
                  <button
                    className="border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white w-6 h-6 flex justify-center items-center rounded transition duration-300"
                    onClick={() => increaseQty(product?._id, product?.quantity)}
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>

    {/* Total product */}
    {
      data[0]&&(
        <div className="w-full max-w-sm lg:mt-0 mt-5">
      {loading ? (
        <div className="h-36 bg-gray-200 border border-gray-300 animate-pulse rounded-lg"></div>
      ) : (
        <div className="h-36 bg-white shadow-md rounded-lg transition-transform transform hover:scale-105 duration-300">
          <h2 className="text-white bg-green-600 px-4 py-2 rounded-t-lg">Summary</h2>
          <div className="flex items-center justify-between px-4 py-2 gap-2 font-medium text-lg text-gray-600">
            <p>Quantity</p>
            <p>{totalQty}</p>
          </div>

          <div className="flex items-center justify-between px-4 py-2 gap-2 font-medium text-lg text-gray-600">
            <p>Total Price</p>
            <p>{displayBDTCurrency(totalPrice)}</p>
          </div>

          <button className="bg-green-600 p-2 text-white w-full mt-2 rounded-b-lg hover:bg-green-700 transition duration-300"onClick={handelPayment}>
            Payment
          </button>
        </div>
      )}
    </div>
      )
    }
    
  </div>
</div>

);
};

export default Cart;