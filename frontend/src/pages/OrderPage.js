import React, { useEffect, useState } from 'react'
import SummaryApi from '../common'
import moment from 'moment'
import displayBDTCurrency from '../helpers/displayCurrency'
import Audio, { Bars, ThreeCircles, ThreeDots } from "react-loader-spinner";


const OrderPage = () => {
  const [data,setData] = useState([])
  const [loading, setLoading] = useState(false);

  const fetchOrderDetails = async()=>{
    setLoading(true)
    const response = await fetch(SummaryApi.orderList.url,{
      method : SummaryApi.orderList.method,
      credentials : 'include',
      headers: {
        "content-type": "application/json",
      },
    })

    const responseData = await response.json()

    setData(responseData.data)
    setLoading(false)
    console.log("order list",responseData)
  }

  useEffect(()=>{
    fetchOrderDetails()
  },[])

  return (
    <div>
       {(data.length === 0 && !loading) ? (
    <div className="text-center text-lg my-3">
      <p className="text-lg text-gray-600">No items in cart</p>
    </div>
):(

    <div className='p-4 w-full'>
      {loading && (
         <div className="h-96 flex justify-center items-center">
         <ThreeDots type="ThreeDots" color="#7542ff" height={80} width={80} />
       </div>
      )}
      {
        data.map((order, index) => {
          console.log("Mapping order:", order);
          return (
            <div key={order._id} className='mb-4'>
              <p className='font-medium text-lg '>{moment(order.createdAt).format('LL')}</p>
              <div className='border rounded'>
                <div className='flex flex-col lg:flex-row justify-between'>
                  <div className='grid gap-1'>
                    {
                      order.productDetails.map((product, productIndex) => {
                        console.log("Product details:", product);
                        return (
                          <div key={product._id} className='flex gap-3 bg-slate-100 p-2'>
                            <img
                              src={product.productId.productImage[0]} // Adjusted to access product image
                              className='w-28 h-28 bg-slate-200 object-scale-down'
                              alt={product.productId.productName}
                            />
                            <div>
                              <div className='font-medium text-lg text-ellipsis line-clamp-1'>{product.productId.productName}</div>
                              <div className='flex items-center gap-5 mt-1'>
                                <div className='text-lg text-red-500'>{displayBDTCurrency(product.productId.price)}</div>
                                <p>Quantity: {product.quantity}</p>
                              </div>
                            </div>
                          </div>
                        )
                      })
                    }
                  </div>
                </div>
                <div className='font-semibold ml-auto w-fit lg:text-lg'>
                  Total Amount: {displayBDTCurrency(order.totalAmount)}
                </div>
              </div>
            </div>
          )
        })
      }
    </div>
)}
  </div>
)
}

export default OrderPage