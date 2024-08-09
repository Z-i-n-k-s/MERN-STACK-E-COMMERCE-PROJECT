import React, { useEffect, useState } from 'react'
import SummaryApi from '../common'
import moment from 'moment'
import displayBDTCurrency from '../helpers/displayCurrency'


const OrderPage = () => {
  const [data,setData] = useState([])

  const fetchOrderDetails = async()=>{
    const response = await fetch(SummaryApi.orderList.url,{
      method : SummaryApi.orderList.method,
      credentials : 'include',
      headers: {
        "content-type": "application/json",
      },
    })

    const responseData = await response.json()

    setData(responseData.data)
    console.log("order list",responseData)
  }

  useEffect(()=>{
    fetchOrderDetails()
  },[])

  return (
    <div>
    {
      !data.length && (
        <p>No Order available</p>
      )
    }

    <div className='p-4 w-full'>
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
  </div>
)
}

export default OrderPage